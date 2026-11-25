// Manda un WhatsApp de prueba al número de avisos (solo con la clave del panel).
import { json, isAdmin } from "../lib/store.mjs";
import { avisar } from "../lib/aviso.mjs";

export default async (req) => {
  if (!isAdmin(req)) return json({ error: "Clave incorrecta" }, 401);
  const r = await avisar("✅ Prueba de avisos de Distribuidor HLC. Si te llegó este mensaje, los avisos de pedidos funcionan.");
  return json(r, r.ok ? 200 : 502);
};

export const config = { path: "/api/admin/aviso-prueba", method: "POST" };
