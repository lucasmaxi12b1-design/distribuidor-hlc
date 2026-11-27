// MODO DEMOSTRACIÓN
// Se activa si NO hay base de datos real (DATABASE_URL) y la variable DEMO vale "1".
// Usa una base de datos liviana que vive dentro del servidor (PGlite):
// sirve para ver el sistema funcionando, pero los datos se BORRAN cada vez
// que el servidor se reinicia. Cuando se conecta la base real, se apaga solo.
import "server-only";
import type postgres from "postgres";

export const modoDemo = () => !process.env.DATABASE_URL && process.env.DEMO === "1";

// Cuentas de prueba que se crean solas en el modo demo
export const CUENTAS_DEMO = {
  coach: { email: (process.env.ADMIN_EMAIL || "coach@demo-lisandro.com").toLowerCase(), clave: "demo1234" },
  alumna: { email: "ana@demo.com", clave: "demo1234" },
};

type Fila = Record<string, unknown>;
type Consultable = {
  query: (texto: string, params?: unknown[]) => Promise<{ rows: Fila[] }>;
  exec: (texto: string) => Promise<unknown>;
};

// Convierte `select ... ${valor}` en "select ... $1" con su lista de valores
function armarConsulta(partes: TemplateStringsArray, valores: unknown[]) {
  let texto = partes[0];
  valores.forEach((_, i) => (texto += `$${i + 1}${partes[i + 1]}`));
  return texto;
}

// Crea un objeto que se usa igual que la conexión real (db()`...`, .unsafe, .begin)
function adaptar(base: Consultable): ReturnType<typeof postgres> {
  const sql = (partes: TemplateStringsArray, ...valores: unknown[]) =>
    base.query(armarConsulta(partes, valores), valores).then((r) => r.rows);
  sql.unsafe = (texto: string) => base.exec(texto);
  sql.begin = async (fn: (tx: unknown) => Promise<unknown>) => {
    const conTransaccion = base as Consultable & {
      transaction: (f: (tx: Consultable) => Promise<unknown>) => Promise<unknown>;
    };
    return conTransaccion.transaction((tx) => fn(adaptar(tx)));
  };
  return sql as unknown as ReturnType<typeof postgres>;
}

export async function crearBaseDemo() {
  const { PGlite } = await import("@electric-sql/pglite");
  const base = new PGlite();
  await base.waitReady;
  return adaptar(base as unknown as Consultable);
}
