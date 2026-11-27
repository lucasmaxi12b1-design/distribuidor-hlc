// Función de ayuda para armar el link de WhatsApp con un mensaje ya escrito.
import { sitio } from "@/contenido/sitio";

export function linkWhatsapp(mensaje: string = sitio.contacto.mensajeWhatsapp) {
  return `https://wa.me/${sitio.contacto.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
