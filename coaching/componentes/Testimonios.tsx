// Sección 5: TESTIMONIOS
// ⚠️ Esta sección NO se muestra hasta que cargues al menos un testimonio
// real en contenido/sitio.ts → testimonios.lista
import { sitio } from "@/contenido/sitio";
import TituloSeccion from "./TituloSeccion";

export default function Testimonios() {
  const { testimonios } = sitio;

  // Si no hay testimonios cargados, no mostramos nada
  if (testimonios.lista.length === 0) return null;

  return (
    <section id="testimonios" className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <TituloSeccion etiqueta="Testimonios" titulo={testimonios.titulo} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonios.lista.map((t) => (
            <figure key={t.nombre + t.texto} className="flex flex-col rounded-3xl border border-tinta/10 bg-white/60 p-8">
              <span aria-hidden className="font-titulo text-5xl leading-none text-terracota/60">“</span>
              <blockquote className="mt-2 flex-1 leading-relaxed text-tinta">{t.texto}</blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-medium text-tinta">{t.nombre}</span>
                {t.detalle && <span className="text-suave"> · {t.detalle}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
