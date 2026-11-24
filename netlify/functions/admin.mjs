// Panel privado: lista de pedidos y cambio de estado. Protegido con ADMIN_PASSWORD.
import { orders, json, isAdmin } from "../lib/store.mjs";

const MANUALES = ["pago_pendiente", "efectivo_pendiente", "pagado", "listo", "enviado", "entregado", "cancelado"];

export default async (req) => {
  if (!Netlify.env.get("ADMIN_PASSWORD")) return json({ error: "Falta configurar ADMIN_PASSWORD en Netlify" }, 503);
  if (!isAdmin(req)) return json({ error: "Contraseña incorrecta" }, 401);
  const store = orders();

  if (req.method === "GET") {
    const { blobs } = await store.list();
    const keys = blobs.map((b) => b.key).sort().reverse().slice(0, 300);
    const lista = (await Promise.all(keys.map((k) => store.get(k, { type: "json" })))).filter(Boolean);
    return json({ pedidos: lista });
  }
  if (req.method === "POST") {
    let b = {};
    try { b = await req.json(); } catch {}
    if (!MANUALES.includes(b.estado)) return json({ error: "Estado inválido" }, 400);
    const p = await store.get(String(b.id || ""), { type: "json" });
    if (!p) return json({ error: "Pedido no encontrado" }, 404);
    p.estado = b.estado;
    p.historial = [...(p.historial || []), { estado: b.estado, fecha: new Date().toISOString() }].slice(-20);
    await store.setJSON(p.id, p);
    return json({ ok: true, pedido: p });
  }
  return json({ error: "Método no permitido" }, 405);
};

export const config = { path: "/api/admin/pedidos", method: ["GET", "POST"] };
