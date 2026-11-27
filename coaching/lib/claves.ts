// Cifrado de contraseñas. Nunca guardamos la contraseña original,
// solo una versión cifrada que no se puede revertir (algoritmo scrypt).
import "server-only";
import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb) as (clave: string, sal: Buffer, largo: number) => Promise<Buffer>;

export async function cifrarClave(clave: string) {
  const sal = randomBytes(16);
  const hash = await scrypt(clave, sal, 64);
  return `${sal.toString("hex")}:${hash.toString("hex")}`;
}

export async function claveCorrecta(clave: string, guardada: string) {
  const [salHex, hashHex] = guardada.split(":");
  const hash = await scrypt(clave, Buffer.from(salHex, "hex"), 64);
  return timingSafeEqual(hash, Buffer.from(hashHex, "hex"));
}
