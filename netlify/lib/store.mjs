import { getStore } from "@netlify/blobs";
import { CATALOG, SUCURSALES } from "./catalog.mjs";

export const orders = () => getStore({ name: "pedidos", consistency: "strong" });
export { CATALOG, SUCURSALES };

export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

export const newId = () => {
  const d = new Date(Date.now() - 3 * 3600e3); // hora Argentina
  const p = (n) => String(n).padStart(2, "0");
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HLC-${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}-${p(d.getUTCHours())}${p(d.getUTCMinutes())}-${rnd}`;
};

export const clean = (v, max = 200) => String(v ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);

export const isAdmin = (req) => {
  const pass = Netlify.env.get("ADMIN_PASSWORD");
  const got = req.headers.get("x-admin-pass") || "";
  if (!pass || got.length !== pass.length) return false;
  let diff = 0;
  for (let i = 0; i < pass.length; i++) diff |= pass.charCodeAt(i) ^ got.charCodeAt(i);
  return diff === 0;
};
