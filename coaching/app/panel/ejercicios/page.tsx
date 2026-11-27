// PANEL — Ejercicios: crear y ver todos
import { Suspense } from "react";
import { requerirAdmin } from "@/lib/sesion";
import { listaEjercicios } from "@/lib/datos";
import { borrarEjercicio, crearEjercicio } from "@/app/acciones";
import { sitio } from "@/contenido/sitio";
import Cargando from "@/componentes/app/Cargando";
import Titulo from "@/componentes/app/Titulo";
import Vacio from "@/componentes/app/Vacio";
import BotonConfirmar from "@/componentes/app/BotonConfirmar";
import { boton, botonPeligro, campo, etiqueta, tarjeta } from "@/componentes/app/estilos";

export default function Ejercicios() {
  return (
    <>
      <Titulo bajada="Si elegís un programa, el ejercicio se asigna solo a todos sus alumnos. Si no, asignalo a mano desde la ficha de cada alumno.">
        Ejercicios
      </Titulo>

      <Suspense fallback={<Cargando />}>
        <Lista />
      </Suspense>
    </>
  );
}

async function Lista() {
  await requerirAdmin();
  const ejercicios = await listaEjercicios();

  return (
    <>
      {/* Crear ejercicio nuevo */}
      <form action={crearEjercicio} className={`${tarjeta} mb-8 space-y-4`}>
        <h2 className="text-lg font-medium text-tinta">Nuevo ejercicio</h2>
        <div>
          <label htmlFor="titulo" className={etiqueta}>Título</label>
          <input id="titulo" name="titulo" required className={campo} placeholder="Ej: Escribí tus 3 metas del mes" />
        </div>
        <div>
          <label htmlFor="descripcion" className={etiqueta}>Instrucciones</label>
          <textarea id="descripcion" name="descripcion" rows={4} className={campo} placeholder="Explicá qué tiene que hacer el alumno" />
        </div>
        <div>
          <label htmlFor="programa" className={etiqueta}>Programa</label>
          <select id="programa" name="programa" className={campo} defaultValue="">
            <option value="">Ninguno (lo asigno a mano)</option>
            {sitio.servicios.lista.map((p) => <option key={p.nombre}>{p.nombre}</option>)}
          </select>
        </div>
        <button className={boton}>Crear ejercicio</button>
      </form>

      {!ejercicios.length && <Vacio>Todavía no creaste ejercicios.</Vacio>}
    <ul className="space-y-3">
      {ejercicios.map((e) => (
        <li key={e.id} className={tarjeta}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-medium text-tinta">{e.titulo}</p>
              <p className="text-xs text-suave">
                {e.programa ?? "Sin programa"} · {e.asignados} alumno{e.asignados === 1 ? "" : "s"} · {e.hechos} lo hicieron
              </p>
              {e.descripcion && <p className="mt-2 line-clamp-3 text-sm whitespace-pre-line text-suave">{e.descripcion}</p>}
            </div>
            <form action={borrarEjercicio}>
              <input type="hidden" name="id" value={e.id} />
              <BotonConfirmar pregunta="¿Borrar este ejercicio? Se quita también a los alumnos que lo tienen." className={botonPeligro}>
                Borrar
              </BotonConfirmar>
            </form>
          </div>
        </li>
      ))}
    </ul>
    </>
  );
}
