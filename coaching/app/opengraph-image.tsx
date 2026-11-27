// Imagen de vista previa al compartir el link (WhatsApp, Instagram, Facebook...).
// Se genera sola con el nombre de tu marca y el título de Inicio (de sitio.ts).
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { sitio } from "@/contenido/sitio";

export const alt = sitio.seo.titulo;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Usamos el ícono de la app dentro de la imagen
  const icono = await readFile(join(process.cwd(), "public/iconos/icono-192.png"), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#faf7f2",
          color: "#2e2a26",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={`data:image/png;base64,${icono}`} width={88} height={88} alt="" />
          <span style={{ fontSize: 40, color: "#5f7a6b" }}>{sitio.marca}</span>
        </div>
        <div style={{ marginTop: 48, fontSize: 64, lineHeight: 1.15, maxWidth: 1000 }}>{sitio.inicio.titulo}</div>
        <div style={{ marginTop: 32, fontSize: 30, color: "#c47a5a" }}>{sitio.inicio.etiqueta}</div>
      </div>
    ),
    size
  );
}
