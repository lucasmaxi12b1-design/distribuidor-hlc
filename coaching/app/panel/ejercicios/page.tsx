// PANEL — Ejercicios: crear y ver todos
import { Suspense } from "react";
import { requerirAdmin } from "@/lib/sesion";
import { listaEjercicios } from "@/lib/datos";
import { borrarEjercicio, crearEjercicio, editarEjercicio } from "@/app/acciones";
import type { Ejercicio } from "@/lib/datos";
import { sitio } from "@/contenido/sitio";
import Cargando from "@/componentes/app/Cargando";
import Titulo from "@/componentes/app/Titulo";
import Vacio from "@/componentes/app/Vacio";
import BotonConfirmar from "@/componentes/app/BotonConfirmar";
import { boton, botonChico, botonPeligro, campo, etiqueta, tarjeta } from "@/componentes/app/estilos";

export default function Ejercicios() {
  return (
    <>
      <Titulo bajada="Ya vienen cargados ejercicios para cada programa. Podés editarlos, borrarlos o crear nuevos.">
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

  // Agrupamos por programa (en el orden de sitio.ts) y al final la biblioteca
  const programas = sitio.servicios.lista.map((p) => p.nombre);
  const todos: [string, Ejercicio[]][] = programas.map((nombre) => [nombre, ejercicios.filter((e) => e.programa === nombre)]);
  todos.push([BIBLIOTECA, ejercicios.filter((e) => !e.programa || !programas.includes(e.programa))]);
  const grupos = todos.filter(([, lista]) => lista.length > 0);

  return (
    <>
      {/* Crear ejercicio nuevo */}
      <details className={`${tarjeta} mb-8`}>
        <summary className="cursor-pointer text-lg font-medium text-salvia">+ Crear ejercicio nuevo</summary>
        <form action={crearEjercicio} className="mt-4 space-y-4">
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
      </details>

      {!ejercicios.length && <Vacio>No hay ejercicios cargados.</Vacio>}

      {/* Agrupados: primero por programa, al final la biblioteca */}
      <div className="space-y-8">
        {grupos.map(([nombre, lista]) => (
          <section key={nombre}>
            <h2 className="mb-1 text-xl font-medium text-tinta">{nombre}</h2>
            <p className="mb-3 text-sm text-suave">
              {nombre === BIBLIOTECA ? "Asignalos a mano desde la ficha de cada alumno." : "Se asignan solos a los alumnos de este programa."}
            </p>
            <ul className="space-y-3">
              {lista.map((e) => <TarjetaEjercicio key={e.id} e={e} />)}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

const BIBLIOTECA = "Biblioteca (sin programa)";

function TarjetaEjercicio({ e }: { e: Ejercicio }) {
  return (
    <li className={tarjeta}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-tinta">{e.titulo}</p>
          <p className="text-xs text-suave">
            {e.asignados} alumno{e.asignados === 1 ? "" : "s"} · {e.hechos} lo hicieron
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

      {/* Editar (se abre al tocar) */}
      <details className="mt-3">
        <summary className={`${botonChico} cursor-pointer list-none`}>Editar</summary>
        <form action={editarEjercicio} className="mt-3 space-y-3">
          <input type="hidden" name="id" value={e.id} />
          <div>
            <label htmlFor={`titulo-${e.id}`} className={etiqueta}>Título</label>
            <input id={`titulo-${e.id}`} name="titulo" required defaultValue={e.titulo} className={campo} />
          </div>
          <div>
            <label htmlFor={`desc-${e.id}`} className={etiqueta}>Instrucciones</label>
            <textarea id={`desc-${e.id}`} name="descripcion" rows={6} defaultValue={e.descripcion} className={campo} />
          </div>
          <button className={boton}>Guardar cambios</button>
        </form>
      </details>
    </li>
  );
}
