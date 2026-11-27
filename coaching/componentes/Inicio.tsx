// Sección 1: INICIO — lo primero que ve la persona al entrar.
// Los textos se editan en contenido/sitio.ts → inicio
import { sitio } from "@/contenido/sitio";

export default function Inicio() {
  const { inicio } = sitio;

  return (
    <section id="inicio" className="relative overflow-hidden px-5 pt-32 pb-20 md:pt-44 md:pb-32">
      {/* Formas decorativas suaves de fondo */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-32 h-96 w-96 rounded-full bg-salvia/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-terracota/10 blur-3xl" />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-6 text-sm font-medium tracking-wide text-terracota">{inicio.etiqueta}</p>

        <h1 className="text-4xl leading-tight font-medium text-tinta sm:text-5xl md:text-6xl">{inicio.titulo}</h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-suave">{inicio.frase}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#reservar"
            className="w-full rounded-full bg-salvia px-8 py-4 font-medium text-white shadow-sm transition hover:bg-salvia-oscuro sm:w-auto"
          >
            {inicio.boton}
          </a>
          <a
            href="#servicios"
            className="w-full rounded-full border border-tinta/15 px-8 py-4 font-medium text-tinta transition hover:border-tinta/40 sm:w-auto"
          >
            {inicio.botonSecundario}
          </a>
        </div>
      </div>
    </section>
  );
}
