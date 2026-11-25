// Mercado Pago avisa acá cuando cambia un pago. Volvemos a consultar el pago con nuestro token,
// así un aviso falso no puede marcar nada como pagado.
import { orders, json } from "../lib/store.mjs";
import { avisar, textoPedido } from "../lib/aviso.mjs";

const ESTADOS = { approved: "pagado", authorized: "pagado", in_process: "pago_en_revision", pending: "pago_pendiente",
  in_mediation: "pago_en_revision", rejected: "pago_rechazado", cancelled: "pago_cancelado", refunded: "devuelto", charged_back: "devuelto" };

export default async (req) => {
  const url = new URL(req.url);
  let body = {};
  try { body = await req.json(); } catch {}
  const tipo = body.type || body.topic || url.searchParams.get("type") || url.searchParams.get("topic");
  const pagoId = body?.data?.id || url.searchParams.get("data.id") || (tipo === "payment" ? url.searchParams.get("id") : null);
  if (tipo !== "payment" || !pagoId || !/^\d+$/.test(String(pagoId))) return json({ ok: true });

  const token = Netlify.env.get("MP_ACCESS_TOKEN");
  if (!token) return json({ ok: false }, 500);
  const r = await fetch(`https://api.mercadopago.com/v1/payments/${pagoId}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!r.ok) { console.error("MP payment fetch", r.status); return json({ ok: false }, 502); }
  const pay = await r.json();
  const id = pay.external_reference;
  if (!id) return json({ ok: true });

  const store = orders();
  const pedido = await store.get(id, { type: "json" });
  if (!pedido) return json({ ok: true });
  if (["entregado", "cancelado"].includes(pedido.estado)) return json({ ok: true });

  const nuevo = ESTADOS[pay.status] || pedido.estado;
  const montoOk = Math.round(Number(pay.transaction_amount) * 100) >= Math.round(pedido.total * 100);
  pedido.estado = nuevo === "pagado" && !montoOk ? "pago_en_revision" : nuevo;
  pedido.mp = { ...(pedido.mp || {}), pagoId: String(pay.id), estadoMP: pay.status, detalle: pay.status_detail,
    metodo: pay.payment_method_id, tipo: pay.payment_type_id, cuotas: pay.installments, monto: pay.transaction_amount,
    actualizado: new Date().toISOString() };
  const avisar_ = !pedido.avisado && ["pagado", "pago_en_revision"].includes(pedido.estado);
  if (avisar_) pedido.avisado = true;
  await store.setJSON(id, pedido);
  if (avisar_) await avisar(textoPedido(pedido, url.origin, pedido.estado === "pagado" ? "💳 Nuevo pedido PAGADO" : "⏳ Nuevo pedido, pago en revisión"));
  return json({ ok: true });
};

export const config = { path: "/api/mp-webhook" };
