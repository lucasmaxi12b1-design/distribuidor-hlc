// Aviso por WhatsApp al dueño cuando entra un pedido. El número y la clave viven solo en las variables de Netlify
// (AVISO_WA_TEL, AVISO_WA_KEY, AVISO_WA_PROVEEDOR = callmebot | textmebot): nunca aparecen en la página.
const enc = encodeURIComponent;
const money = (v) => "$" + Number(v).toLocaleString("es-AR");
const PAGOS = { efectivo: "Efectivo", tarjeta: "Tarjeta", mercadopago: "Mercado Pago" };

export function textoPedido(p, origin, titulo) {
  const ent = p.entrega?.tipo === "envio" ? `Envío a ${p.entrega.direccion}, ${p.entrega.localidad}` : `Retiro en ${p.entrega?.sucursal}`;
  const items = (p.items || []).map((i) => `• ${i.qty} x ${i.nombre}${i.tam ? " " + i.tam : ""}`).join("\n");
  return [
    `*${titulo}* ${p.id}`,
    `Cliente: ${p.cliente?.nombre} · ${p.cliente?.telefono}`,
    ent,
    `Pago: ${PAGOS[p.pago] || p.pago}`,
    `Total: *${money(p.total)}*`,
    items,
    p.nota ? `Nota: ${p.nota}` : "",
    origin ? `Ver en el panel: ${origin}/admin/` : "",
  ].filter(Boolean).join("\n");
}

export async function avisar(texto) {
  const tel = (Netlify.env.get("AVISO_WA_TEL") || "").trim();
  const key = (Netlify.env.get("AVISO_WA_KEY") || "").trim();
  const prov = (Netlify.env.get("AVISO_WA_PROVEEDOR") || "callmebot").trim().toLowerCase();
  if (!tel || !key) return { ok: false, motivo: "sin_configurar" };
  const t = texto.slice(0, 1500);
  const url = prov === "textmebot"
    ? `https://api.textmebot.com/send.php?recipient=${enc(tel)}&apikey=${enc(key)}&text=${enc(t)}`
    : `https://api.callmebot.com/whatsapp.php?phone=${enc(tel)}&apikey=${enc(key)}&text=${enc(t)}`;
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const body = (await r.text()).slice(0, 300);
    if (!r.ok) console.error("Aviso WhatsApp", prov, r.status, body);
    return { ok: r.ok, status: r.status, respuesta: body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 200) };
  } catch (e) {
    console.error("Aviso WhatsApp error", prov, String(e));
    return { ok: false, motivo: "error_conexion" };
  }
}
