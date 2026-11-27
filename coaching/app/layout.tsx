// Layout: la "estructura" que envuelve toda la página.
// Acá se cargan las tipografías y los datos para Google y para
// la vista previa al compartir el link (WhatsApp, Instagram, etc.).
import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { sitio } from "@/contenido/sitio";
import RegistrarServiceWorker from "@/componentes/RegistrarServiceWorker";

// Tipografía para los títulos (serif, cálida)
const fuenteTitulos = Fraunces({
  variable: "--font-titulos",
  subsets: ["latin"],
});

// Tipografía para el texto (muy legible en celular)
const fuenteTexto = Inter({
  variable: "--font-texto",
  subsets: ["latin"],
});

// Datos para buscadores y redes sociales (se toman de contenido/sitio.ts)
export const metadata: Metadata = {
  metadataBase: new URL(sitio.url),
  title: sitio.seo.titulo,
  description: sitio.seo.descripcion,
  openGraph: {
    title: sitio.seo.titulo,
    description: sitio.seo.descripcion,
    url: sitio.url,
    siteName: sitio.marca,
    locale: "es_AR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  // Para que en iPhone se vea bien cuando se instala como app
  appleWebApp: { capable: true, title: sitio.marca, statusBarStyle: "default" },
};

// Color de la barra del navegador en el celular
export const viewport: Viewport = {
  themeColor: "#faf7f2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${fuenteTitulos.variable} ${fuenteTexto.variable} antialiased`}>
      <body className="min-h-screen">
        {children}
        <RegistrarServiceWorker />
      </body>
    </html>
  );
}
