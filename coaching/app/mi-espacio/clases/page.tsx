// ESPACIO DEL ALUMNO — Clases: reservar turnos y ver las reservadas
import { Suspense } from "react";
import { requerirAlumno } from "@/lib/sesion";
import { clasesDeAlumno, turnosLibres } from "@/lib/datos";
import { porDia, soloHora, horaActual } from "@/lib/fechas";
import { cancelarTurno, reservarTurno } from "@/app/acciones";
import Cargando from "@/componentes/app/Cargando";
import Titulo from "@/componentes/app/Titulo";
import Vacio from "@/componentes/app/Vacio";
import TarjetaClase from "@/componentes/app/TarjetaClase";

// Mensajes que aparecen después de reservar o cancelar
const AVISOS: Record<string, { texto: string; bien: boolean }> = {
  reservada: { texto: "¡Listo! Tu clase quedó reservada.", bien: true },
  cancelada: { texto: "Cancelaste la clase. El horario quedó libre.", bien: true },
  ocupado: { texto: "Ese horario se acaba de ocupar. Elegí otro.", bien: false },
  tarde: { texto: "Las clases se pueden cancelar hasta 24 horas antes. Escribime por Mensajes.", bien: false },
};

export default function ClasesAlumno({ searchParams }: PageProps<"/mi-espacio/clases">) {
  return (
    <>
      <Titulo bajada="Los horarios están en hora de Argentina.">Mis clases</Titulo>
      <Suspense fallback={<Cargando />}>
        <Contenido searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Contenido({ searchParams }: { searchParams: PageProps<"/mi-espacio/clases">["searchParams"] }) {
  const u = await requerirAlumno();
  const { aviso } = await searchParams;
  const [mias, libres] = await Promise.all([clasesDeAlumno(u.id), turnosLibres()]);
  const ahora = await horaActual();
  const proximas = mias.filter((c) => c.inicio.getTime() + c.duracion_min * 60_000 > ahora);
  const mensaje = typeof aviso === "string" ? AVISOS[aviso] : undefined;

  return (
    <div className="space-y-8">
      {mensaje && (
        <p className={`rounded-2xl px-4 py-3 text-sm ${mensaje.bien ? "bg-salvia/10 text-salvia-oscuro" : "bg-red-50 text-red-800"}`} role="status">
          {mensaje.texto}
        </p>
      )}

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-tinta">Reservadas</h2>
        {proximas.length ? (
          proximas.map((c) => <TarjetaClase key={c.id} turno={c} ahora={ahora} cancelar={cancelarTurno} />)
        ) : (
          <Vacio>No tenés clases reservadas. Elegí un horario acá abajo.</Vacio>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-medium text-tinta">Horarios disponibles</h2>
        {libres.length ? (
          <div className="space-y-5">
            {porDia(libres).map(([dia, turnos]) => (
              <div key={dia}>
                <p className="mb-2 text-sm font-medium text-suave first-letter:uppercase">{dia}</p>
                <div className="flex flex-wrap gap-2">
                  {turnos.map((t) => (
                    <form key={t.id} action={reservarTurno}>
                      <input type="hidden" name="id" value={t.id} />
                      <button className="rounded-full border border-salvia/30 bg-white px-5 py-2.5 font-medium text-salvia-oscuro transition hover:bg-salvia hover:text-white">
                        {soloHora(t.inicio)}
                      </button>
                    </form>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Vacio>Por ahora no hay horarios libres. Escribime por Mensajes y coordinamos.</Vacio>
        )}
      </section>
    </div>
  );
}
