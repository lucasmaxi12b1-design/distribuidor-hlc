// Lecturas de la base de datos que usan las páginas.
// Cada función se usa SOLO después de comprobar quién inició sesión.
import "server-only";
import { db, prepararBase } from "./db";

// ---------------------------------------------------------------
// Tipos (la forma de cada dato)
// ---------------------------------------------------------------
export type Asignacion = {
  id: number;
  ejercicio_id: number;
  titulo: string;
  descripcion: string;
  programa: string | null;
  fecha_limite: string | null;
  hecho_en: Date | null;
  devolucion: string | null;
};

export type Turno = {
  id: number;
  inicio: Date;
  duracion_min: number;
  sala: string;
  alumno_id: number | null;
  alumno_nombre?: string | null;
};

export type Mensaje = { id: number; de_admin: boolean; texto: string; creado: Date };

export type Alumno = {
  id: number;
  nombre: string;
  email: string;
  programa: string | null;
  creado: Date;
  pendientes: number;
  hechos: number;
  sin_leer: number;
};

export type Ejercicio = {
  id: number;
  titulo: string;
  descripcion: string;
  programa: string | null;
  asignados: number;
  hechos: number;
};

export type Consulta = { id: number; nombre: string; email: string; mensaje: string; leida: boolean; creado: Date };

// ---------------------------------------------------------------
// ALUMNO
// ---------------------------------------------------------------

// Ejercicios asignados a un alumno (primero los pendientes)
export async function ejerciciosDeAlumno(usuarioId: number) {
  await prepararBase();
  return db()<Asignacion[]>`
    select a.id, a.ejercicio_id, e.titulo, e.descripcion, e.programa, to_char(a.fecha_limite, 'YYYY-MM-DD') as fecha_limite,
           a.hecho_en, a.devolucion
    from asignaciones a join ejercicios e on e.id = a.ejercicio_id
    where a.usuario_id = ${usuarioId}
    order by (a.hecho_en is not null), a.fecha_limite nulls last, a.creado, a.ejercicio_id`;
}

// Clases reservadas por un alumno
export async function clasesDeAlumno(usuarioId: number) {
  await prepararBase();
  return db()<Turno[]>`
    select id, inicio, duracion_min, sala, alumno_id from turnos
    where alumno_id = ${usuarioId} order by inicio`;
}

// Turnos libres para reservar (desde 2 horas en adelante)
export async function turnosLibres() {
  await prepararBase();
  return db()<Turno[]>`
    select id, inicio, duracion_min, sala, alumno_id from turnos
    where alumno_id is null and inicio > now() + interval '2 hours'
    order by inicio limit 60`;
}

// Conversación entre el coach y un alumno
export async function mensajesDeAlumno(usuarioId: number) {
  await prepararBase();
  return db()<Mensaje[]>`
    select id, de_admin, texto, creado from mensajes
    where usuario_id = ${usuarioId} order by creado`;
}

// Mensajes del coach que el alumno todavía no leyó
export async function mensajesSinLeerAlumno(usuarioId: number) {
  await prepararBase();
  const [r] = await db()<{ n: number }[]>`
    select count(*)::int as n from mensajes where usuario_id = ${usuarioId} and de_admin and not leido`;
  return r.n;
}

// ---------------------------------------------------------------
// COACH (panel)
// ---------------------------------------------------------------

// Lista de alumnos con su avance
export async function listaAlumnos() {
  await prepararBase();
  return db()<Alumno[]>`
    select u.id, u.nombre, u.email, u.programa, u.creado,
      (select count(*)::int from asignaciones a where a.usuario_id = u.id and a.hecho_en is null) as pendientes,
      (select count(*)::int from asignaciones a where a.usuario_id = u.id and a.hecho_en is not null) as hechos,
      (select count(*)::int from mensajes m where m.usuario_id = u.id and not m.de_admin and not m.leido) as sin_leer
    from usuarios u where not u.es_admin
    order by u.creado desc`;
}

export async function alumnoPorId(id: number) {
  await prepararBase();
  const [a] = await db()<{ id: number; nombre: string; email: string; programa: string | null; creado: Date }[]>`
    select id, nombre, email, programa, creado from usuarios where id = ${id} and not es_admin`;
  return a ?? null;
}

// Todos los ejercicios creados, con cuántos alumnos los tienen
export async function listaEjercicios() {
  await prepararBase();
  return db()<Ejercicio[]>`
    select e.id, e.titulo, e.descripcion, e.programa,
      count(a.id)::int as asignados,
      count(a.hecho_en)::int as hechos
    from ejercicios e left join asignaciones a on a.ejercicio_id = e.id
    group by e.id order by e.programa nulls last, e.id`;
}

// Turnos desde hoy en adelante (libres y reservados)
export async function agendaProxima() {
  await prepararBase();
  return db()<Turno[]>`
    select t.id, t.inicio, t.duracion_min, t.sala, t.alumno_id, u.nombre as alumno_nombre
    from turnos t left join usuarios u on u.id = t.alumno_id
    where t.inicio > now() - interval '3 hours'
    order by t.inicio limit 200`;
}

export async function listaConsultas() {
  await prepararBase();
  return db()<Consulta[]>`select id, nombre, email, mensaje, leida, creado from consultas order by creado desc limit 200`;
}

// Números para el resumen del panel
export async function resumenPanel() {
  await prepararBase();
  const [r] = await db()<
    { alumnos: number; clases_semana: number; mensajes: number; consultas: number; pendientes: number }[]
  >`
    select
      (select count(*)::int from usuarios where not es_admin) as alumnos,
      (select count(*)::int from turnos where alumno_id is not null and inicio between now() and now() + interval '7 days') as clases_semana,
      (select count(*)::int from mensajes where not de_admin and not leido) as mensajes,
      (select count(*)::int from consultas where not leida) as consultas,
      (select count(*)::int from asignaciones where hecho_en is null) as pendientes`;
  return r;
}
