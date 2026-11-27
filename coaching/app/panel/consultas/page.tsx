// PANEL — Consultas que llegan desde el formulario de la página
import { Suspense } from "react";
import { requerirAdmin } from "@/lib/sesion";
import { listaConsultas } from "@/lib/datos";
import { cuando } from "@/lib/fechas";
import { borrarConsulta, marcarConsulta } from "@/app/acciones";
import Cargando from "@/componentes/app/Cargando";
import Titulo from "@/componentes/app/Titulo";
import Vacio from "@/componentes/app/Vacio";
import BotonConfirmar from "@/componentes/app/BotonConfirmar";
import { botonChico, botonPeligro, tarjeta } from "@/componentes/app/estilos";

export default function Consultas() {
  return (
    <>
      <Titulo bajada="Mensajes de personas que todavía no tienen cuenta. Respondeles al mail que dejaron.">Consultas</Titulo>
      <Suspense fallback={<Cargando />}>
        <Lista />
      </Suspense>
    </>
  );
}

async function Lista() {
  await requerirAdmin();
  const consultas = await listaConsultas();
  if (!consultas.length) return <Vacio>No hay consultas por ahora.</Vacio>;

  return (
    <ul className="space-y-3">
      {consultas.map((c) => (
        <li key={c.id} className={`${tarjeta} ${c.leida ? "opacity-70" : "border-terracota/40"}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-medium text-tinta">
              {!c.leida && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-terracota align-middle" aria-label="Nueva" />}
              {c.nombre}
            </p>
            <p className="text-xs text-suave">{cuando(c.creado)}</p>
          </div>
          <a href={`mailto:${c.email}`} className="text-sm text-salvia underline underline-offset-4">{c.email}</a>
          <p className="mt-3 whitespace-pre-line text-tinta">{c.mensaje}</p>
          <div className="mt-4 flex gap-2">
            <form action={marcarConsulta}>
              <input type="hidden" name="id" value={c.id} />
              <input type="hidden" name="leida" value={c.leida ? "no" : "si"} />
              <button className={botonChico}>{c.leida ? "Marcar como nueva" : "Marcar como leída"}</button>
            </form>
            <form action={borrarConsulta}>
              <input type="hidden" name="id" value={c.id} />
              <BotonConfirmar pregunta="¿Borrar esta consulta?" className={botonPeligro}>Borrar</BotonConfirmar>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}
