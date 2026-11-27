// RESERVAS — muestra tu calendario de Cal.com o Calendly dentro de la página.
// El link se carga en contenido/sitio.ts → linkReservas
// Si todavía no lo cargaste, muestra un botón para coordinar por WhatsApp.
import { sitio } from "@/contenido/sitio";
import { linkWhatsapp } from "@/lib/enlaces";
import TituloSeccion from "./TituloSeccion";

// Agrega al link los parámetros para que el calendario se vea "embebido"
// (sin los menús de Cal.com/Calendly alrededor).
function linkEmbebido(link: string) {
  const url = new URL(link);
  if (url.hostname.includes("calendly.com")) {
    url.searchParams.set("embed_type", "Inline");
    url.searchParams.set("hide_gdpr_banner", "1");
  } else {
    url.searchParams.set("embed", "true"); // Cal.com
  }
  return url.toString();
}

export default function Reservar() {
  const { reservas, linkReservas } = sitio;

  return (
    <section id="reservar" className="bg-salvia-claro px-5 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <TituloSeccion etiqueta="Agenda" titulo={reservas.titulo} bajada={linkReservas ? reservas.bajada : undefined} />

        {linkReservas ? (
          <>
            <div className="overflow-hidden rounded-3xl border border-tinta/10 bg-white">
              <iframe
                src={linkEmbebido(linkReservas)}
                title="Calendario para reservar una sesión"
                className="h-[720px] w-full"
                loading="lazy"
              />
            </div>
            {/* Por si el calendario no carga bien en algún celular */}
            <p className="mt-4 text-center text-sm text-suave">
              ¿No ves el calendario?{" "}
              <a href={linkReservas} target="_blank" rel="noopener noreferrer" className="text-salvia underline underline-offset-4">
                Abrilo en otra pestaña
              </a>
            </p>
          </>
        ) : (
          // Mientras no haya link de calendario
          <div className="mx-auto max-w-xl rounded-3xl bg-crema p-8 text-center md:p-12">
            <p className="text-lg leading-relaxed text-suave">{reservas.sinCalendario}</p>
            <a
              href={linkWhatsapp("¡Hola! Quiero reservar una sesión.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-salvia px-8 py-4 font-medium text-white transition hover:bg-salvia-oscuro"
            >
              Coordinar por WhatsApp
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
