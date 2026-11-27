// Botón redondo de WhatsApp que queda siempre visible abajo a la derecha.
// Muy útil en celular: la persona puede escribirte desde cualquier parte.
import { linkWhatsapp } from "@/lib/enlaces";
import IconoWhatsapp from "./IconoWhatsapp";

export default function BotonWhatsappFlotante() {
  return (
    <a
      href={linkWhatsapp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribime por WhatsApp"
      className="fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition hover:scale-105"
    >
      <IconoWhatsapp tamano={28} />
    </a>
  );
}
