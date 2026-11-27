// PANEL — Ficha de un alumno: programa, ejercicios, mensajes y clases
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { requerirAdmin } from "@/lib/sesion";
import { alumnoPorId, clasesDeAlumno, ejerciciosDeAlumno, listaEjercicios, mensajesDeAlumno } from "@/lib/datos";
import { db } from "@/lib/db";
import { fechaCorta, fechaHora, horaActual } from "@/lib/fechas";
import { sitio } from "@/contenido/sitio";
import {
  asignarEjercicio, asignarPrograma, borrarAlumno, guardarDevolucion, quitarAsignacion, responderMensaje,
} from "@/app/acciones";
import Cargando from "@/componentes/app/Cargando";
import Conversacion from "@/componentes/app/Conversacion";
import FormularioMensaje from "@/componentes/app/FormularioMensaje";
import BotonNuevaClave from "@/componentes/app/BotonNuevaClave";
import BotonConfirmar from "@/componentes/app/BotonConfirmar";
import Vacio from "@/componentes/app/Vacio";
import { boton, botonChico, botonPeligro, campo, etiqueta, tarjeta } from "@/componentes/app/estilos";

export default function FichaAlumno({ params }: PageProps<"/panel/alumnos/[id]">) {
  return (
    <>
      <Link href="/panel/alumnos" className="mb-4 inline-block text-sm text-suave hover:text-tinta">← Alumnos</Link>
      <Suspense fallback={<Cargando />}>
        <Contenido params={params} />
      </Suspense>
    </>
  );
}

async function Contenido({ params }: { params: PageProps<"/panel/alumnos/[id]">["params"] }) {
  await requerirAdmin();
  const id = Number((await params).id);
  const alumno = await alumnoPorId(id);
  if (!alumno) notFound();

  const [asignados, todos, mensajes, clases] = await Promise.all([
    ejerciciosDeAlumno(id), listaEjercicios(), mensajesDeAlumno(id), clasesDeAlumno(id),
  ]);
  // Al abrir la ficha, los mensajes del alumno quedan como leídos
  await db()`update mensajes set leido = true where usuario_id = ${id} and not de_admin and not leido`;

  const yaAsignados = new Set(asignados.map((a) => a.ejercicio_id));
  const paraAsignar = todos.filter((e) => !yaAsignados.has(e.id));
  const ahora = await horaActual();
  const proximas = clases.filter((c) => c.inicio.getTime() > ahora);

  return (
    <div className="space-y-10">
      {/* Datos y programa */}
      <section>
        <h1 className="text-3xl font-medium text-tinta">{alumno.nombre}</h1>
        <p className="mt-1 text-suave">{alumno.email}</p>
        <form action={asignarPrograma} className="mt-5 flex flex-wrap items-end gap-2">
          <input type="hidden" name="alumno_id" value={alumno.id} />
          <div className="min-w-56 flex-1">
            <label htmlFor="programa" className={etiqueta}>Programa</label>
            <select id="programa" name="programa" defaultValue={alumno.programa ?? ""} className={campo}>
              <option value="">Sin programa</option>
              {sitio.servicios.lista.map((p) => <option key={p.nombre}>{p.nombre}</option>)}
            </select>
          </div>
          <button className={boton}>Guardar</button>
        </form>
        <p className="mt-2 text-xs text-suave">Al asignar un programa, el alumno recibe todos los ejercicios de ese programa.</p>
      </section>

      {/* Ejercicios */}
      <section className="space-y-3">
        <h2 className="text-xl font-medium text-tinta">Ejercicios</h2>
        {asignados.length ? (
          asignados.map((a) => (
            <div key={a.id} className={tarjeta}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className={`font-medium ${a.hecho_en ? "text-salvia" : "text-tinta"}`}>
                    {a.hecho_en ? "✓ " : ""}{a.titulo}
                  </p>
                  <p className="text-xs text-suave">
                    {a.hecho_en ? "Hecho" : "Pendiente"}
                    {a.fecha_limite ? ` · para el ${fechaCorta(a.fecha_limite)}` : ""}
                    {a.programa ? ` · ${a.programa}` : ""}
                  </p>
                </div>
                <form action={quitarAsignacion}>
                  <input type="hidden" name="id" value={a.id} />
                  <BotonConfirmar pregunta="¿Quitarle este ejercicio al alumno?" className={botonPeligro}>Quitar</BotonConfirmar>
                </form>
              </div>
              <form action={guardarDevolucion} className="mt-3 flex items-end gap-2">
                <input type="hidden" name="id" value={a.id} />
                <label htmlFor={`dev-${a.id}`} className="sr-only">Devolución</label>
                <textarea id={`dev-${a.id}`} name="devolucion" rows={1} defaultValue={a.devolucion ?? ""} placeholder="Dejale una devolución (opcional)" className={`${campo} text-sm`} />
                <button className={botonChico}>Guardar</button>
              </form>
            </div>
          ))
        ) : (
          <Vacio>No tiene ejercicios asignados.</Vacio>
        )}

        {/* Asignar uno existente */}
        {paraAsignar.length > 0 ? (
          <form action={asignarEjercicio} className={`${tarjeta} grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-end`}>
            <input type="hidden" name="alumno_id" value={alumno.id} />
            <div>
              <label htmlFor="ejercicio_id" className={etiqueta}>Asignar ejercicio</label>
              <select id="ejercicio_id" name="ejercicio_id" required className={campo}>
                {paraAsignar.map((e) => <option key={e.id} value={e.id}>{e.titulo}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="fecha_limite" className={etiqueta}>Para el (opcional)</label>
              <input id="fecha_limite" name="fecha_limite" type="date" className={campo} />
            </div>
            <button className={boton}>Asignar</button>
          </form>
        ) : (
          <p className="text-sm text-suave">
            Para asignar más, primero creá ejercicios en <Link href="/panel/ejercicios" className="text-salvia underline">Ejercicios</Link>.
          </p>
        )}
      </section>

      {/* Próximas clases */}
      <section className="space-y-2">
        <h2 className="text-xl font-medium text-tinta">Próximas clases</h2>
        {proximas.length ? (
          <ul className="space-y-1 text-tinta">
            {proximas.map((c) => <li key={c.id} className="first-letter:uppercase">{fechaHora(c.inicio)} hs</li>)}
          </ul>
        ) : (
          <p className="text-suave">No tiene clases reservadas.</p>
        )}
      </section>

      {/* Mensajes */}
      <section className="space-y-4">
        <h2 className="text-xl font-medium text-tinta">Mensajes</h2>
        <Conversacion mensajes={mensajes} soyAdmin />
        <FormularioMensaje accion={responderMensaje} alumnoId={alumno.id} />
      </section>

      {/* Cuenta */}
      <section className="space-y-4 border-t border-tinta/10 pt-6">
        <h2 className="text-xl font-medium text-tinta">Cuenta</h2>
        <BotonNuevaClave alumnoId={alumno.id} />
        <form action={borrarAlumno}>
          <input type="hidden" name="alumno_id" value={alumno.id} />
          <BotonConfirmar pregunta="¿Borrar este alumno y todos sus datos? No se puede deshacer." className={botonPeligro}>
            Borrar alumno
          </BotonConfirmar>
        </form>
      </section>
    </div>
  );
}
