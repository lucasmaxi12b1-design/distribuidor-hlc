// Sección 4: CÓMO FUNCIONA — los pasos del proceso, numerados.
// Los pasos se editan en contenido/sitio.ts → comoFunciona
import { sitio } from "@/contenido/sitio";
import TituloSeccion from "./TituloSeccion";

export default function ComoFunciona() {
  const { comoFunciona } = sitio;

  return (
    <section id="como-funciona" className="bg-arena px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <TituloSeccion etiqueta="El proceso" titulo={comoFunciona.titulo} />

        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {comoFunciona.pasos.map((paso, i) => (
            <li key={paso.titulo} className="flex gap-5 lg:flex-col">
              {/* Número del paso */}
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-crema font-titulo text-xl text-salvia ring-1 ring-salvia/20">
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl font-medium text-tinta">{paso.titulo}</h3>
                <p className="mt-2 leading-relaxed text-suave">{paso.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
