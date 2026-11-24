// Descarga en cada publicación las fotos de productos que vienen de las webs de las marcas
// y las guarda dentro del sitio (site/img/ext), así la tienda no depende de esas webs.
import { readFile, writeFile, mkdir } from "node:fs/promises";
const list = JSON.parse(await readFile(new URL("./images.json", import.meta.url), "utf8"));
await mkdir("site/img/ext", { recursive: true });
let ok = 0, fail = [];
const get = async ([dest, url]) => {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (DistribuidorHLC build)" } });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length < 500) throw new Error("archivo vacío");
      await writeFile("site/img/ext/" + dest, buf); ok++; return;
    } catch (e) { if (i === 2) fail.push(dest + " (" + e.message + ")"); }
  }
};
for (let i = 0; i < list.length; i += 8) await Promise.all(list.slice(i, i + 8).map(get));
console.log(`Fotos descargadas: ${ok}/${list.length}`);
if (fail.length) console.log("No se pudieron descargar:\n" + fail.join("\n"));
