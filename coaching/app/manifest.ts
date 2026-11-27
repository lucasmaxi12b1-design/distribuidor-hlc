// Manifest de la PWA: le dice al celular/compu cómo mostrar la web
// cuando se instala como app (nombre, colores, íconos).
import type { MetadataRoute } from "next";
import { sitio } from "@/contenido/sitio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: sitio.marca,
    short_name: sitio.marca,
    description: sitio.seo.descripcion,
    start_url: "/",
    display: "standalone", // se abre como app, sin la barra del navegador
    background_color: "#faf7f2",
    theme_color: "#5f7a6b",
    lang: "es-AR",
    icons: [
      { src: "/iconos/icono-192.png", sizes: "192x192", type: "image/png" },
      { src: "/iconos/icono-512.png", sizes: "512x512", type: "image/png" },
      // Versión "maskable": Android la recorta en círculo o cuadrado redondeado
      { src: "/iconos/icono-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
