// Conexión a la base de datos (Postgres).
// La dirección de la base se lee de la variable DATABASE_URL:
//  - En tu compu: está en el archivo .env.local
//  - En Vercel: se carga sola al crear la base Neon (ver README)
import "server-only";
import postgres from "postgres";

// Reutilizamos la conexión mientras el servidor está prendido
const global = globalThis as unknown as { conexion?: ReturnType<typeof postgres> };

// Devuelve la conexión (la abre la primera vez que se usa)
export function db() {
  if (!global.conexion) {
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
`;

let preparada: Promise<unknown> | null = null;

// Llamar antes de usar la base: crea las tablas si todavía no existen
export function prepararBase() {
  preparada ??= db().unsafe(ESQUEMA).catch((e) => {
    preparada = null; // si falló, que lo vuelva a intentar la próxima vez
    throw e;
  });
  return preparada;
}
