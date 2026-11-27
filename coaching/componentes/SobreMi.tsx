// Sección 2: SOBRE MÍ — tu historia, formación y foto.
// Los textos y la foto se editan en contenido/sitio.ts → sobreMi
import Image from "next/image";
import { sitio } from "@/contenido/sitio";

export default function SobreMi() {
  const { sobreMi } = sitio;

  return (
    <section id="sobre-mi" className="bg-arena px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
        {/* FOTO (o recuadro de reemplazo si todavía no cargaste la tuya) */}
        <div className="relative mx-auto w-full max-w-[17rem] md:max-w-sm">
          {/* Marco decorativo detrás de la foto */}
          <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-salvia/15" />
          {sobreMi.foto ? (
            <Image
              src={sobreMi.foto}
              alt={`Foto de ${sitio.nombre}`}
              width={800}
              height={1000}
              className="relative aspect-[4/5] w-full rounded-[2rem] object-cover"
              sizes="(min-width: 768px) 384px, 100vw"
            />
          ) : (
            <div className="relative flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 rounded-[2rem] border-2 border-dashed border-salvia/30 bg-crema text-center text-suave">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
              </svg>
              <p className="px-8 text-sm">Acá va tu foto</p>
            </div>
          )}
        </div>

        {/* TEXTO */}
        <div>
          <p className="mb-3 text-sm font-medium tracking-wide text-terracota">Sobre mí</p>
          <h2 className="text-3xl font-medium text-tinta md:text-4xl">{sobreMi.titulo}</h2>

          <div className="mt-6 space-y-4 text-lg leading-relaxed text-suave">
            {sobreMi.historia.map((parrafo) => (
              <p key={parrafo}>{parrafo}</p>
            ))}
          </div>

          {/* Formación */}
          <h3 className="mt-10 mb-4 text-lg font-medium text-tinta">Formación</h3>
          <ul className="space-y-3">
            {sobreMi.formacion.map((item) => (
              <li key={item} className="flex items-start gap-3 text-suave">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terracota" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
