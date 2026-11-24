// Estado público de un pedido para la pantalla de confirmación (solo datos mínimos).
import { orders, json } from "../lib/store.mjs";

export default async (req) => {
  const id = new URL(req.url).searchParams.get("id") || "";
  if (!/^HLC-\d{8}-\d{4}-[A-Z0-9]{4}$/.test(id)) return json({ error: "Pedido no encontrado" }, 404);
  const p = await orders().get(id, { type: "json" });
  if (!p) return json({ error: "Pedido no encontrado" }, 404);
  return json({ id: p.id, estado: p.estado, total: p.total, pago: p.pago,
    entrega: p.entrega.tipo === "retiro" ? { tipo: "retiro", sucursal: p.entrega.sucursal } : { tipo: "envio" },
    items: p.items.map((i) => ({ nombre: i.nombre, tam: i.tam, qty: i.qty })) });
};

export const config = { path: "/api/pedido", method: "GET" };
