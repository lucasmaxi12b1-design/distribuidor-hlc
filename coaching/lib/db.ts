// Conexión a la base de datos (Postgres).
// La dirección de la base se lee de la variable DATABASE_URL:
//  - En tu compu: está en el archivo .env.local
//  - En Vercel: se carga sola al crear la base Neon (ver README)
import "server-only";
import postgres from "postgres";
import { ejerciciosIniciales } from "@/contenido/ejercicios";
import { CUENTAS_DEMO, crearBaseDemo, modoDemo } from "./demo";
import { cifrarClave } from "./claves";

// Reutilizamos la conexión mientras el servidor está prendido
const global = globalThis as unknown as { conexion?: ReturnType<typeof postgres> };

// Devuelve la conexión (la abre la primera vez que se usa)
export function db() {
  if (!global.conexion) {
    if (modoDemo()) throw new Error("En modo demo la base se abre con prepararBase().");
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("Falta DATABASE_URL: configurá la base de datos (ver README).");
    // En la nube la conexión va cifrada (ssl). En tu compu (localhost) no hace falta.
    const esLocal = url.includes("localhost") || url.includes("127.0.0.1");
    global.conexion = postgres(url, { ssl: esLocal ? false : "require", max: 5 });
  }
  return global.conexion;
}

// ---------------------------------------------------------------
// TABLAS: se crean solas la primera vez (si ya existen, no hace nada).
// ---------------------------------------------------------------
const ESQUEMA = `
create table if not exists usuarios (
  id serial primary key,
  nombre text not null,
  email text not null unique,
  clave_hash text not null,
  es_admin boolean not null default false,
  programa text,                         -- programa contratado (o vacío)
  creado timestamptz not null default now()
);

create table if not exists sesiones (
  token_hash text primary key,           -- guardamos el token cifrado, nunca el original
  usuario_id int not null references usuarios(id) on delete cascade,
  vence timestamptz not null
);

create table if not exists ejercicios (
  id serial primary key,
  titulo text not null,
  descripcion text not null default '',
  programa text,                         -- si tiene programa, se asigna a todos sus alumnos
  creado timestamptz not null default now()
);

create table if not exists asignaciones (
  id serial primary key,
  ejercicio_id int not null references ejercicios(id) on delete cascade,
  usuario_id int not null references usuarios(id) on delete cascade,
  fecha_limite date,
  hecho_en timestamptz,                  -- cuándo lo marcó como hecho (vacío = pendiente)
  devolucion text,                       -- comentario del coach
  creado timestamptz not null default now(),
  unique (ejercicio_id, usuario_id)
);

create table if not exists mensajes (
  id serial primary key,
  usuario_id int not null references usuarios(id) on delete cascade, -- conversación de este alumno
  de_admin boolean not null,             -- true = lo escribió el coach
  texto text not null,
  leido boolean not null default false,
  creado timestamptz not null default now()
);

create table if not exists consultas (
  id serial primary key,
  nombre text not null,
  email text not null,
  mensaje text not null,
  leida boolean not null default false,
  creado timestamptz not null default now()
);

create table if not exists turnos (
  id serial primary key,
  inicio timestamptz not null unique,
  duracion_min int not null default 60,
  alumno_id int references usuarios(id) on delete set null, -- vacío = turno libre
  sala text not null unique,             -- nombre de la sala de videollamada
  reservado_en timestamptz
);

create table if not exists config (     -- notas internas del sistema
  clave text primary key
);
`;

let preparada: Promise<unknown> | null = null;

// Carga los ejercicios de contenido/ejercicios.ts. Se hace UNA sola vez:
// queda anotado en la tabla "config" para no volver a cargarlos.
async function cargarEjerciciosIniciales() {
  await db().begin(async (tx) => {
    const primeraVez = await tx`
      insert into config (clave) values ('ejercicios_iniciales') on conflict do nothing returning clave`;
    if (!primeraVez.length) return;
    for (const e of ejerciciosIniciales) {
      await tx`insert into ejercicios (titulo, descripcion, programa) values (${e.titulo}, ${e.descripcion}, ${e.programa})`;
    }
    // Si ya había alumnos con programa, se los asignamos
    await tx`
      insert into asignaciones (ejercicio_id, usuario_id)
      select e.id, u.id from ejercicios e join usuarios u on u.programa = e.programa
      order by e.id
      on conflict do nothing`;
  });
}

// MODO DEMO: carga cuentas y datos de ejemplo para poder recorrer el sistema
async function cargarDatosDemo() {
  const sql = db();
  const claveCoach = await cifrarClave(CUENTAS_DEMO.coach.clave);
  const claveAlumna = await cifrarClave(CUENTAS_DEMO.alumna.clave);
  await sql`insert into usuarios (nombre, email, clave_hash, es_admin)
            values ('Lisandro', ${CUENTAS_DEMO.coach.email}, ${claveCoach}, true)`;
  const [ana] = await sql<{ id: number }[]>`
    insert into usuarios (nombre, email, clave_hash, programa)
    values ('Ana Pérez', ${CUENTAS_DEMO.alumna.email}, ${claveAlumna}, 'Programa 4 semanas') returning id`;

  // Ejercicios del programa de Ana (el primero, hecho y con devolución)
  await sql`insert into asignaciones (ejercicio_id, usuario_id)
            select id, ${ana.id} from ejercicios where programa = 'Programa 4 semanas' order by id`;
  await sql`update asignaciones set hecho_en = now() - interval '2 days',
              devolucion = '¡Muy buen comienzo, Ana! Lo charlamos en la clase.'
            where id = (select min(id) from asignaciones where usuario_id = ${ana.id})`;

  // Una clase EN CURSO (para probar la videollamada) y horarios libres.
  // Las horas se calculan en la base de datos, en hora de Argentina.
  await sql`insert into turnos (inicio, duracion_min, sala, alumno_id, reservado_en)
            values (now() - interval '5 minutes', 60, 'lisandro-coaching-demo-' || md5(random()::text), ${ana.id}, now())`;
  for (const [dias, hora] of [[1, 18], [2, 10], [3, 19], [7, 18], [8, 10]]) {
    await sql`insert into turnos (inicio, sala) values (
      (date_trunc('day', now() at time zone 'America/Argentina/Buenos_Aires')
        + make_interval(days => ${dias}::int, hours => ${hora}::int)) at time zone 'America/Argentina/Buenos_Aires',
      'lisandro-coaching-demo-' || md5(random()::text))`;
  }

  // Mensajes y una consulta de ejemplo
  await sql`insert into mensajes (usuario_id, de_admin, texto, leido) values
    (${ana.id}, false, 'Hola Lisandro, ya hice el primer ejercicio. ¿Lo vemos en la clase?', true),
    (${ana.id}, true, '¡Genial, Ana! Sí, lo vemos hoy. Nos encontramos en la sala.', false)`;
  await sql`insert into consultas (nombre, email, mensaje)
            values ('Martín', 'martin@ejemplo.com', '¿Las clases sirven si estoy terminando la facultad?')`;
}

// Llamar antes de usar la base: crea las tablas si todavía no existen
export function prepararBase() {
  if (modoDemo()) {
    preparada ??= crearBaseDemo().then(async (base) => {
      global.conexion = base;
      await base.unsafe(ESQUEMA);
      await cargarEjerciciosIniciales();
      await cargarDatosDemo();
    });
    return preparada;
  }
  preparada ??= db().unsafe(ESQUEMA).then(cargarEjerciciosIniciales).catch((e) => {
    preparada = null; // si falló, que lo vuelva a intentar la próxima vez
    throw e;
  });
  return preparada;
}
