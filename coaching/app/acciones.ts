"use server";
// ACCIONES: lo que pasa cuando alguien toca un botón o envía un formulario.
// Se ejecutan en el servidor. Cada una revisa primero quién la pide.
import { redirect } from "next/navigation";
import { refresh } from "next/cache";
import { randomBytes } from "node:crypto";
import { db, prepararBase } from "@/lib/db";
import { cifrarClave, claveCorrecta } from "@/lib/claves";
import { cerrarSesion, esEmailAdmin, iniciarSesion, requerirAdmin, requerirUsuario } from "@/lib/sesion";
import { sitio } from "@/contenido/sitio";
import { modoDemo } from "@/lib/demo";

// Estado que devuelven los formularios (para mostrar errores o avisos)
export type Estado = { error?: string; ok?: string } | undefined;

// Ayudas para leer los campos del formulario
const texto = (fd: FormData, campo: string) => String(fd.get(campo) ?? "").trim();
const numero = (fd: FormData, campo: string) => Number(fd.get(campo));
const emailValido = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const programas = () => sitio.servicios.lista.map((p) => p.nombre);

// Mientras la base de datos no esté configurada, avisamos en vez de mostrar un error
const SIN_BASE: Estado = { error: "El sistema se está terminando de configurar. Probá de nuevo en un rato." };
const baseLista = () => Boolean(process.env.DATABASE_URL) || modoDemo();

// =================================================================
// CUENTAS
// =================================================================

export async function registrarse(_: Estado, fd: FormData): Promise<Estado> {
  if (!baseLista()) return SIN_BASE;
  const nombre = texto(fd, "nombre");
  const email = texto(fd, "email").toLowerCase();
  const clave = String(fd.get("clave") ?? "");

  if (nombre.length < 2) return { error: "Escribí tu nombre." };
  if (!emailValido(email)) return { error: "Revisá el mail, parece que tiene un error." };
  if (clave.length < 8) return { error: "La contraseña tiene que tener al menos 8 caracteres." };

  await prepararBase();
  const [existe] = await db()`select id from usuarios where email = ${email}`;
  if (existe) return { error: "Ya hay una cuenta con ese mail. Probá ingresar." };

  const [u] = await db()<{ id: number }[]>`
    insert into usuarios (nombre, email, clave_hash, es_admin)
    values (${nombre}, ${email}, ${await cifrarClave(clave)}, ${esEmailAdmin(email)})
    returning id`;
  await iniciarSesion(u.id);
  redirect(esEmailAdmin(email) ? "/panel" : "/mi-espacio");
}

export async function ingresar(_: Estado, fd: FormData): Promise<Estado> {
  if (!baseLista()) return SIN_BASE;
  const email = texto(fd, "email").toLowerCase();
  const clave = String(fd.get("clave") ?? "");

  await prepararBase();
  const [u] = await db()<{ id: number; clave_hash: string; es_admin: boolean }[]>`
    select id, clave_hash, es_admin from usuarios where email = ${email}`;
  if (!u || !(await claveCorrecta(clave, u.clave_hash))) {
    return { error: "El mail o la contraseña no coinciden." };
  }
  // Si el mail del coach se configuró después de crear la cuenta, lo hacemos admin ahora
  const admin = u.es_admin || esEmailAdmin(email);
  if (admin && !u.es_admin) await db()`update usuarios set es_admin = true where id = ${u.id}`;

  await iniciarSesion(u.id);
  redirect(admin ? "/panel" : "/mi-espacio");
}

export async function salir() {
  await cerrarSesion();
  redirect("/");
}

// =================================================================
// PÁGINA PÚBLICA: formulario de contacto
// =================================================================

export async function enviarConsulta(_: Estado, fd: FormData): Promise<Estado> {
  if (!baseLista()) return SIN_BASE;
  const nombre = texto(fd, "nombre");
  const email = texto(fd, "email");
  const mensaje = texto(fd, "mensaje");
  if (!nombre || !mensaje) return { error: "Completá tu nombre y tu mensaje." };
  if (!emailValido(email)) return { error: "Dejame un mail válido para poder responderte." };
  if (mensaje.length > 3000) return { error: "El mensaje es muy largo." };

  await prepararBase();
  await db()`insert into consultas (nombre, email, mensaje) values (${nombre}, ${email}, ${mensaje})`;
  return { ok: "¡Gracias! Recibí tu mensaje y te respondo a la brevedad." };
}

// =================================================================
// ALUMNO
// =================================================================

// Marcar un ejercicio como hecho (o volver a dejarlo pendiente)
export async function cambiarHecho(fd: FormData) {
  const u = await requerirUsuario();
  const hecho = fd.get("hecho") === "si";
  await db()`
    update asignaciones set hecho_en = ${hecho ? new Date() : null}
    where id = ${numero(fd, "id")} and usuario_id = ${u.id}`;
  refresh();
}

export async function reservarTurno(fd: FormData) {
  const u = await requerirUsuario();
  // Solo se reserva si sigue libre (por si dos personas tocan a la vez)
  const r = await db()`
    update turnos set alumno_id = ${u.id}, reservado_en = now()
    where id = ${numero(fd, "id")} and alumno_id is null and inicio > now()
    returning id`;
  redirect(`/mi-espacio/clases?aviso=${r.length ? "reservada" : "ocupado"}`);
}

export async function cancelarTurno(fd: FormData) {
  const u = await requerirUsuario();
  // Se puede cancelar hasta 24 horas antes
  const r = await db()`
    update turnos set alumno_id = null, reservado_en = null
    where id = ${numero(fd, "id")} and alumno_id = ${u.id} and inicio > now() + interval '24 hours'
    returning id`;
  redirect(`/mi-espacio/clases?aviso=${r.length ? "cancelada" : "tarde"}`);
}

export async function enviarMensajeAlumno(fd: FormData) {
  const u = await requerirUsuario();
  const t = texto(fd, "texto");
  if (t) await db()`insert into mensajes (usuario_id, de_admin, texto) values (${u.id}, false, ${t.slice(0, 3000)})`;
  refresh();
}

// =================================================================
// COACH (panel)
// =================================================================

// Asigna un ejercicio a un alumno (si ya lo tenía, no lo duplica)
async function asignar(ejercicioId: number, alumnoId: number, fechaLimite: string | null) {
  await db()`
    insert into asignaciones (ejercicio_id, usuario_id, fecha_limite)
    values (${ejercicioId}, ${alumnoId}, ${fechaLimite})
    on conflict (ejercicio_id, usuario_id) do nothing`;
}

export async function asignarPrograma(fd: FormData) {
  await requerirAdmin();
  const alumnoId = numero(fd, "alumno_id");
  const programa = texto(fd, "programa");
  const valor = programas().includes(programa) ? programa : null;
  await db()`update usuarios set programa = ${valor} where id = ${alumnoId} and not es_admin`;
  // Le asignamos todos los ejercicios de ese programa
  if (valor) {
    const ejercicios = await db()<{ id: number }[]>`select id from ejercicios where programa = ${valor} order by id`;
    for (const e of ejercicios) await asignar(e.id, alumnoId, null);
  }
  refresh();
}

export async function crearEjercicio(fd: FormData) {
  await requerirAdmin();
  const titulo = texto(fd, "titulo");
  const descripcion = texto(fd, "descripcion");
  const programa = texto(fd, "programa");
  const valor = programas().includes(programa) ? programa : null;
  if (!titulo) return;

  const [e] = await db()<{ id: number }[]>`
    insert into ejercicios (titulo, descripcion, programa) values (${titulo}, ${descripcion}, ${valor}) returning id`;
  // Si es de un programa, se lo damos a todos los alumnos de ese programa
  if (valor) {
    const alumnos = await db()<{ id: number }[]>`select id from usuarios where programa = ${valor}`;
    for (const a of alumnos) await asignar(e.id, a.id, null);
  }
  refresh();
}

export async function editarEjercicio(fd: FormData) {
  await requerirAdmin();
  const titulo = texto(fd, "titulo");
  if (!titulo) return;
  await db()`update ejercicios set titulo = ${titulo}, descripcion = ${texto(fd, "descripcion")} where id = ${numero(fd, "id")}`;
  refresh();
}

export async function borrarEjercicio(fd: FormData) {
  await requerirAdmin();
  await db()`delete from ejercicios where id = ${numero(fd, "id")}`;
  refresh();
}

export async function asignarEjercicio(fd: FormData) {
  await requerirAdmin();
  const fecha = texto(fd, "fecha_limite") || null;
  await asignar(numero(fd, "ejercicio_id"), numero(fd, "alumno_id"), fecha);
  refresh();
}

export async function quitarAsignacion(fd: FormData) {
  await requerirAdmin();
  await db()`delete from asignaciones where id = ${numero(fd, "id")}`;
  refresh();
}

export async function guardarDevolucion(fd: FormData) {
  await requerirAdmin();
  await db()`update asignaciones set devolucion = ${texto(fd, "devolucion") || null} where id = ${numero(fd, "id")}`;
  refresh();
}

export async function responderMensaje(fd: FormData) {
  await requerirAdmin();
  const t = texto(fd, "texto");
  if (t) {
    await db()`insert into mensajes (usuario_id, de_admin, texto) values (${numero(fd, "alumno_id")}, true, ${t.slice(0, 3000)})`;
  }
  refresh();
}

// Crea turnos libres. Se pueden repetir varias semanas seguidas.
export async function crearTurnos(_: Estado, fd: FormData): Promise<Estado> {
  await requerirAdmin();
  const fecha = texto(fd, "fecha"); // AAAA-MM-DD
  const hora = texto(fd, "hora"); // HH:MM
  const duracion = Math.min(Math.max(numero(fd, "duracion") || 60, 15), 240);
  const semanas = Math.min(Math.max(numero(fd, "semanas") || 1, 1), 12);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || !/^\d{2}:\d{2}$/.test(hora)) {
    return { error: "Elegí la fecha y la hora." };
  }

  // Las horas se cargan en hora de Argentina (UTC-3)
  const primero = new Date(`${fecha}T${hora}:00-03:00`);
  if (primero.getTime() < Date.now()) return { error: "Esa fecha ya pasó." };

  let creados = 0;
  for (let i = 0; i < semanas; i++) {
    const inicio = new Date(primero.getTime() + i * 7 * 24 * 60 * 60 * 1000);
    const sala = `lisandro-coaching-${randomBytes(6).toString("hex")}`;
    const r = await db()`
      insert into turnos (inicio, duracion_min, sala) values (${inicio}, ${duracion}, ${sala})
      on conflict (inicio) do nothing returning id`;
    creados += r.length;
  }
  refresh();
  return { ok: creados === 1 ? "Turno creado." : `Se crearon ${creados} turnos.` };
}

export async function borrarTurno(fd: FormData) {
  await requerirAdmin();
  await db()`delete from turnos where id = ${numero(fd, "id")}`;
  refresh();
}

// El coach libera un turno reservado (por ejemplo, si el alumno avisó que no puede)
export async function liberarTurno(fd: FormData) {
  await requerirAdmin();
  await db()`update turnos set alumno_id = null, reservado_en = null where id = ${numero(fd, "id")}`;
  refresh();
}

export async function marcarConsulta(fd: FormData) {
  await requerirAdmin();
  await db()`update consultas set leida = ${fd.get("leida") === "si"} where id = ${numero(fd, "id")}`;
  refresh();
}

export async function borrarConsulta(fd: FormData) {
  await requerirAdmin();
  await db()`delete from consultas where id = ${numero(fd, "id")}`;
  refresh();
}

// Si un alumno se olvidó la contraseña, el coach le genera una nueva temporal
export async function nuevaClave(_: Estado, fd: FormData): Promise<Estado> {
  await requerirAdmin();
  const clave = randomBytes(5).toString("hex"); // 10 caracteres
  await db()`update usuarios set clave_hash = ${await cifrarClave(clave)} where id = ${numero(fd, "alumno_id")} and not es_admin`;
  await db()`delete from sesiones where usuario_id = ${numero(fd, "alumno_id")}`;
  return { ok: clave };
}

export async function borrarAlumno(fd: FormData) {
  await requerirAdmin();
  await db()`delete from usuarios where id = ${numero(fd, "alumno_id")} and not es_admin`;
  redirect("/panel/alumnos");
}
