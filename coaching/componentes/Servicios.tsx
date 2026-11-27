// Sección 3: SERVICIOS — una tarjeta por programa.
// Los programas, precios y textos se editan en contenido/sitio.ts → servicios
import { sitio } from "@/contenido/sitio";
import TituloSeccion from "./TituloSeccion";

export default function Servicios() {
  const { servicios } = sitio;

  return (
    <section id="servicios" className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <TituloSeccion etiqueta="Servicios" titulo={servicios.titulo} bajada={servicios.bajada} />

        <div className="grid gap-6 md:grid-cols-3">
          {servicios.lista.map((programa) => (
            <article
              key={programa.nombre}
              className={`relative flex flex-col rounded-3xl p-8 ${
                programa.destacado
                  ? "bg-salvia text-white shadow-lg shadow-salvia/20"
                  : "border border-tinta/10 bg-white/60"
              }`}
            >
              {/* Cartelito "Más elegido" en el programa destacado */}
              {programa.destacado && (
                <span className="absolute -top-3 left-8 rounded-full bg-terracota px-3 py-1 text-xs font-medium text-white">
                  Más elegido
                </span>
              )}

              <h3 className={`text-2xl font-medium ${programa.destacado ? "text-white" : "text-tinta"}`}>
                {programa.nombre}
              </h3>
              <p className={`mt-1 text-sm ${programa.destacado ? "text-white/80" : "text-suave"}`}>
                {programa.duracion}
              </p>

              <p className={`mt-6 font-titulo text-4xl ${programa.destacado ? "text-white" : "text-tinta"}`}>
                {programa.precio}
              </p>

              <p className={`mt-6 leading-relaxed ${programa.destacado ? "text-white/90" : "text-suave"}`}>
                {programa.descripcion}
              </p>

              {/* Lista de lo que incluye */}
              <ul className="mt-6 mb-8 space-y-2.5">
                {programa.incluye.map((item) => (
                  <li key={item} className={`flex gap-2.5 text-sm ${programa.destacado ? "text-white/90" : "text-suave"}`}>
                    <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Botones (mt-auto los empuja al fondo de la tarjeta) */}
              <div className="mt-auto space-y-3">
                <a
                  href="#reservar"
                  className={`block rounded-full py-3.5 text-center font-medium transition ${
                    programa.destacado
                      ? "bg-white text-salvia-oscuro hover:bg-crema"
                      : "bg-salvia text-white hover:bg-salvia-oscuro"
                  }`}
                >
                  Reservar
                </a>

                {/* 💳 Botón de Mercado Pago: aparece solo si activás "pagosOnline"
                    y cargás el "linkPago" de este programa en sitio.ts */}
                {servicios.pagosOnline && programa.linkPago && (
                  <a
                    href={programa.linkPago}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block rounded-full border py-3.5 text-center font-medium transition ${
                      programa.destacado ? "border-white/40 text-white hover:bg-white/10" : "border-tinta/15 text-tinta hover:border-tinta/40"
                    }`}
                  >
                    Pagar con Mercado Pago
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-suave">{servicios.notaPrecios}</p>
      </div>
    </section>
  );
}
