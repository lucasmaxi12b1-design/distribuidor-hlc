// Sección 6: PREGUNTAS FRECUENTES — se abren y cierran al tocarlas.
// Las preguntas se editan en contenido/sitio.ts → preguntas
import { sitio } from "@/contenido/sitio";
import TituloSeccion from "./TituloSeccion";

export default function Preguntas() {
  const { preguntas } = sitio;

  return (
    <section id="preguntas" className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <TituloSeccion etiqueta="Dudas" titulo={preguntas.titulo} />

        <div className="divide-y divide-tinta/10 border-y border-tinta/10">
          {preguntas.lista.map((item) => (
            // <details> es un elemento del navegador que se abre/cierra solo
            <details key={item.pregunta} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-medium text-tinta [&::-webkit-details-marker]:hidden">
                {item.pregunta}
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-arena text-salvia transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 pr-12 leading-relaxed text-suave">{item.respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
