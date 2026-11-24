// Crea un pedido. Los precios se calculan acá con el catálogo del servidor, nunca con lo que manda el navegador.
import { orders, json, newId, clean, CATALOG, SUCURSALES } from "../lib/store.mjs";

export default async (req, context) => {
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);
  let body;
  try { body = await req.json(); } catch { return json({ error: "Datos inválidos" }, 400); }

  const nombre = clean(body?.cliente?.nombre, 80);
  const telefono = clean(body?.cliente?.telefono, 40);
  const email = clean(body?.cliente?.email, 120);
  const entregaTipo = body?.entrega?.tipo === "envio" ? "envio" : "retiro";
  const sucursal = SUCURSALES.includes(body?.entrega?.sucursal) ? body.entrega.sucursal : null;
  const direccion = clean(body?.entrega?.direccion, 160);
  const localidad = clean(body?.entrega?.localidad, 80);
  const pago = ["tarjeta", "mercadopago", "efectivo"].includes(body?.pago) ? body.pago : null;
  const nota = clean(body?.nota, 400);

  const faltan = [];
  if (!nombre) faltan.push("nombre");
  if (telefono.replace(/\D/g, "").length < 8) faltan.push("teléfono");
  if (entregaTipo === "retiro" && !sucursal) faltan.push("sucursal");
  if (entregaTipo === "envio" && (!direccion || !localidad)) faltan.push("dirección y localidad");
  if (!pago) faltan.push("forma de pago");
  if (faltan.length) return json({ error: "Faltan datos: " + faltan.join(", ") }, 400);

  const items = [];
  for (const it of Array.isArray(body?.items) ? body.items.slice(0, 60) : []) {
    const prod = CATALOG[it?.id];
    const qty = Math.floor(Number(it?.qty));
    if (!prod || !(qty >= 1 && qty <= 99)) return json({ error: "Hay un producto inválido en el carrito" }, 400);
    if (!prod.precio) return json({ error: `"${prod.nombre}" no tiene precio online. Consultanos por ese producto.` }, 400);
    items.push({ id: prod.id, nombre: prod.nombre, marca: prod.marca, tam: prod.tam, precio: prod.precio, unidad: prod.unidad, qty });
  }
  if (!items.length) return json({ error: "El carrito está vacío" }, 400);

  const total = items.reduce((s, i) => s + i.precio * i.qty, 0);
  const id = newId();
  const pedido = {
    id, creado: new Date().toISOString(), estado: pago === "efectivo" ? "efectivo_pendiente" : "pago_pendiente",
    cliente: { nombre, telefono, email },
    entrega: entregaTipo === "envio" ? { tipo: "envio", direccion, localidad } : { tipo: "retiro", sucursal },
    pago, total, items, nota, mp: null,
  };

  const store = orders();

  if (pago === "efectivo") {
    await store.setJSON(id, pedido);
    return json({ id, estado: pedido.estado, total });
  }

  const token = Netlify.env.get("MP_ACCESS_TOKEN");
  if (!token) return json({ error: "El pago online todavía no está configurado. Elegí efectivo o probá más tarde." }, 503);

  const origin = new URL(req.url).origin;
  const pref = {
    items: items.map((i) => ({
      id: String(i.id), title: `${i.nombre}${i.tam ? " " + i.tam : ""}`.slice(0, 250),
      quantity: i.qty, unit_price: i.precio, currency_id: "ARS",
    })),
    payer: { name: nombre, ...(email ? { email } : {}) },
    external_reference: id,
    statement_descriptor: "DISTRIBUIDOR HLC",
    back_urls: {
      success: `${origin}/?pedido=${id}`,
      pending: `${origin}/?pedido=${id}`,
      failure: `${origin}/?pedido=${id}`,
    },
    auto_return: "approved",
    notification_url: `${origin}/api/mp-webhook`,
    ...(pago === "tarjeta" ? { payment_methods: { excluded_payment_types: [{ id: "ticket" }, { id: "atm" }] } } : {}),
  };

  const r = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "X-Idempotency-Key": id },
    body: JSON.stringify(pref),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !data.init_point) {
    console.error("Mercado Pago preference error", r.status, JSON.stringify(data).slice(0, 500));
    return json({ error: "No pudimos iniciar el pago con Mercado Pago. Probá de nuevo en unos minutos." }, 502);
  }
  pedido.mp = { preferenceId: data.id };
  await store.setJSON(id, pedido);
  return json({ id, estado: pedido.estado, total, pagarEn: data.init_point });
};

export const config = { path: "/api/pedidos", method: "POST" };
