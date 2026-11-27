// Sesiones: recuerdan quién inició sesión, con una "cookie" en el navegador.
import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, randomBytes } from "node:crypto";
import { db, prepararBase } from "./db";

const COOKIE = "sesion";
const DIAS = 30; // la sesión dura 30 días

export type Usuario = {
  id: number;
  nombre: string;
  email: string;
  es_admin: boolean;
  programa: string | null;
};

const cifrar = (token: string) => createHash("sha256").update(token).digest("hex");

// ¿Este mail es el del coach? (se configura en la variable ADMIN_EMAIL)
export function esEmailAdmin(email: string) {
  const admin = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  return admin !== "" && admin === email.trim().toLowerCase();
}

export async function iniciarSesion(usuarioId: number) {
  await prepararBase();
  const token = randomBytes(32).toString("hex");
  const vence = new Date(Date.now() + DIAS * 24 * 60 * 60 * 1000);
  await db()`insert into sesiones (token_hash, usuario_id, vence) values (${cifrar(token)}, ${usuarioId}, ${vence})`;
  (await cookies()).set(COOKIE, token, {
    httpOnly: true, // el código de la página no puede leerla (más seguro)
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: vence,
    path: "/",
  });
}

export async function cerrarSesion() {
  const almacen = await cookies();
  const token = almacen.get(COOKIE)?.value;
  if (token) await db()`delete from sesiones where token_hash = ${cifrar(token)}`;
  almacen.delete(COOKIE);
}

// Devuelve el usuario que inició sesión, o null si no hay nadie
export async function usuarioActual(): Promise<Usuario | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  await prepararBase();
  const [u] = await db()<Usuario[]>`
    select u.id, u.nombre, u.email, u.es_admin, u.programa
    from sesiones s join usuarios u on u.id = s.usuario_id
    where s.token_hash = ${cifrar(token)} and s.vence > now()`;
  return u ?? null;
}

// Para páginas del alumno: si no inició sesión, lo manda a ingresar
export async function requerirUsuario() {
  const u = await usuarioActual();
  if (!u) redirect("/ingresar");
  return u;
}

// Para el panel del coach: solo entra el admin
export async function requerirAdmin() {
  const u = await requerirUsuario();
  if (!u.es_admin) redirect("/mi-espacio");
  return u;
}

// Para el espacio del alumno: el coach tiene su propio panel
export async function requerirAlumno() {
  const u = await requerirUsuario();
  if (u.es_admin) redirect("/panel");
  return u;
}

// En "Ingresar" y "Crear cuenta": si ya inició sesión, lo lleva a su espacio
export async function siYaInicioSesionRedirigir() {
  const u = await usuarioActual();
  if (u) redirect(u.es_admin ? "/panel" : "/mi-espacio");
  return null;
}
