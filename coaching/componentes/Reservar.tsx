// RESERVAS — invita a crear la cuenta para reservar dentro del sistema.
// Los textos se editan en contenido/sitio.ts → reservas
import Link from "next/link";
import { sitio } from "@/contenido/sitio";
import TituloSeccion from "./TituloSeccion";

export default function Reservar() {
  const { reservas } = sitio;

  return (
    <section id="reservar" className="bg-salvia-claro px-5 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <TituloSeccion etiqueta="Agenda" titulo={reservas.titulo} bajada={reservas.bajada} />

        {/* Los 3 pasos para reservar */}
        <ol className="mx-auto mb-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {reservas.pasos.map((paso, i) => (
            <li key={paso} className="flex items-center gap-3 rounded-2xl bg-crema px-4 py-4 text-tinta">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-salvia font-titulo text-white">{i + 1}</span>
              {paso}
            </li>
          ))}
        </ol>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/registro" className="w-full rounded-full bg-salvia px-8 py-4 text-center font-medium text-white transition hover:bg-salvia-oscuro sm:w-auto">
            Crear mi cuenta y reservar
          </Link>
          <Link href="/ingresar" className="w-full rounded-full border border-tinta/15 bg-crema px-8 py-4 text-center font-medium text-tinta transition hover:border-tinta/40 sm:w-auto">
            Ya tengo cuenta
          </Link>
        </div>
      </div>
    </section>
  );
}
