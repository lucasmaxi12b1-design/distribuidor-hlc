// PANEL — Lista de alumnos
import Link from "next/link";
import { Suspense } from "react";
import { requerirAdmin } from "@/lib/sesion";
import { listaAlumnos } from "@/lib/datos";
import Cargando from "@/componentes/app/Cargando";
import Titulo from "@/componentes/app/Titulo";
import Vacio from "@/componentes/app/Vacio";
import { tarjeta } from "@/componentes/app/estilos";

export default function Alumnos() {
  return (
    <>
      <Titulo bajada="Tocá un alumno para ver sus ejercicios, mensajes y programa.">Alumnos</Titulo>
      <Suspense fallback={<Cargando />}>
        <Lista />
      </Suspense>
    </>
  );
}

async function Lista() {
  await requerirAdmin();
  const alumnos = await listaAlumnos();
  if (!alumnos.length) return <Vacio>Todavía no se registró nadie. Compartí tu página para que creen su cuenta.</Vacio>;

  return (
    <ul className="space-y-3">
      {alumnos.map((a) => (
        <li key={a.id}>
          <Link href={`/panel/alumnos/${a.id}`} className={`${tarjeta} flex items-center justify-between gap-4 transition hover:border-salvia/40`}>
            <div className="min-w-0">
              <p className="truncate font-medium text-tinta">{a.nombre}</p>
              <p className="truncate text-sm text-suave">{a.programa ?? "Sin programa asignado"}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 text-xs">
              {a.sin_leer > 0 && <span className="rounded-full bg-terracota px-2.5 py-1 text-white">{a.sin_leer} mensaje{a.sin_leer > 1 ? "s" : ""}</span>}
              <span className="rounded-full bg-arena px-2.5 py-1 text-suave">
                {a.hechos}/{a.hechos + a.pendientes} ejercicios
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
