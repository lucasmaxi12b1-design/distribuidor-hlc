// ESPACIO DEL ALUMNO — Ejercicios asignados
import { Suspense } from "react";
import { requerirAlumno } from "@/lib/sesion";
import { ejerciciosDeAlumno, type Asignacion } from "@/lib/datos";
import { fechaCorta } from "@/lib/fechas";
import { cambiarHecho } from "@/app/acciones";
import Cargando from "@/componentes/app/Cargando";
import Titulo from "@/componentes/app/Titulo";
import Vacio from "@/componentes/app/Vacio";
import { tarjeta } from "@/componentes/app/estilos";

export default function EjerciciosAlumno() {
  return (
    <>
      <Titulo bajada="Hacelos a tu ritmo y marcalos cuando los termines.">Mis ejercicios</Titulo>
      <Suspense fallback={<Cargando />}>
        <Lista />
      </Suspense>
    </>
  );
}

async function Lista() {
  const u = await requerirAlumno();
  const ejercicios = await ejerciciosDeAlumno(u.id);
  if (!ejercicios.length) return <Vacio>Todavía no tenés ejercicios asignados.</Vacio>;

  const pendientes = ejercicios.filter((e) => !e.hecho_en);
  const hechos = ejercicios.filter((e) => e.hecho_en);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="text-lg font-medium text-tinta">Para hacer ({pendientes.length})</h2>
        {pendientes.length ? pendientes.map((e) => <TarjetaEjercicio key={e.id} e={e} />) : <Vacio>¡Terminaste todos! 🎉</Vacio>}
      </section>
      {hechos.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-medium text-tinta">Hechos ({hechos.length})</h2>
          {hechos.map((e) => <TarjetaEjercicio key={e.id} e={e} />)}
        </section>
      )}
    </div>
  );
}

function TarjetaEjercicio({ e }: { e: Asignacion }) {
  const hecho = !!e.hecho_en;
  return (
    <article className={`${tarjeta} ${hecho ? "bg-white/60" : ""}`}>
      <div className="flex items-start gap-4">
        {/* Botón para marcar / desmarcar */}
        <form action={cambiarHecho}>
          <input type="hidden" name="id" value={e.id} />
          <input type="hidden" name="hecho" value={hecho ? "no" : "si"} />
          <button
            aria-label={hecho ? "Marcar como pendiente" : "Marcar como hecho"}
            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition ${
              hecho ? "border-salvia bg-salvia text-white" : "border-tinta/20 text-transparent hover:border-salvia hover:text-salvia/40"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
              <path d="M5 12l5 5L20 7" />
            </svg>
          </button>
        </form>

        <div className="min-w-0 flex-1">
          <h3 className={`text-lg font-medium ${hecho ? "text-suave line-through" : "text-tinta"}`}>{e.titulo}</h3>
          <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-suave">
            {e.programa && <span>{e.programa}</span>}
            {e.fecha_limite && !hecho && <span>Para el {fechaCorta(e.fecha_limite)}</span>}
          </div>
          {e.descripcion && !hecho && <p className="mt-3 leading-relaxed whitespace-pre-line text-suave">{e.descripcion}</p>}
          {e.devolucion && (
            <div className="mt-4 rounded-2xl bg-salvia/10 px-4 py-3 text-sm">
              <p className="font-medium text-salvia-oscuro">Devolución</p>
              <p className="mt-1 whitespace-pre-line text-tinta">{e.devolucion}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
