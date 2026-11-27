// PANEL — Agenda: cargar horarios libres y ver las reservas
import { Suspense } from "react";
import { requerirAdmin } from "@/lib/sesion";
import { agendaProxima } from "@/lib/datos";
import { porDia, soloHora, horaActual } from "@/lib/fechas";
import { borrarTurno, liberarTurno } from "@/app/acciones";
import Cargando from "@/componentes/app/Cargando";
import Titulo from "@/componentes/app/Titulo";
import Vacio from "@/componentes/app/Vacio";
import BotonConfirmar from "@/componentes/app/BotonConfirmar";
import FormularioTurnos from "@/componentes/app/FormularioTurnos";
import { boton, botonPeligro, tarjeta } from "@/componentes/app/estilos";

export default function Agenda() {
  return (
    <>
      <Titulo bajada="Cargá tus horarios libres. Tus alumnos los ven y reservan desde su espacio.">Agenda</Titulo>
      <Suspense fallback={<Cargando />}>
        <Lista />
      </Suspense>
    </>
  );
}

async function Lista() {
  await requerirAdmin();
  const turnos = await agendaProxima();
  const ahora = horaActual();

  return (
    <div className="space-y-6">
      <FormularioTurnos />
      {!turnos.length && <Vacio>No tenés horarios cargados.</Vacio>}
      {porDia(turnos).map(([dia, lista]) => (
        <section key={dia}>
          <h2 className="mb-2 text-sm font-medium text-suave first-letter:uppercase">{dia}</h2>
          <ul className="space-y-2">
            {lista.map((t) => {
              const enCurso = ahora >= t.inicio.getTime() - 15 * 60_000 && ahora <= t.inicio.getTime() + t.duracion_min * 60_000;
              return (
                <li key={t.id} className={`${tarjeta} flex flex-wrap items-center justify-between gap-3 py-4`}>
                  <div>
                    <p className="font-medium text-tinta">
                      {soloHora(t.inicio)} hs <span className="font-normal text-suave">· {t.duracion_min} min</span>
                    </p>
                    <p className={`text-sm ${t.alumno_id ? "text-salvia" : "text-suave"}`}>
                      {t.alumno_id ? `Reservado por ${t.alumno_nombre}` : "Libre"}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {t.alumno_id && enCurso && (
                      <a href={`https://meet.jit.si/${t.sala}`} target="_blank" rel="noopener noreferrer" className={boton}>
                        Entrar a la clase
                      </a>
                    )}
                    {t.alumno_id ? (
                      <form action={liberarTurno}>
                        <input type="hidden" name="id" value={t.id} />
                        <BotonConfirmar pregunta="¿Cancelar la reserva de este alumno? El horario queda libre." className={botonPeligro}>
                          Cancelar reserva
                        </BotonConfirmar>
                      </form>
                    ) : (
                      <form action={borrarTurno}>
                        <input type="hidden" name="id" value={t.id} />
                        <button className={botonPeligro}>Borrar</button>
                      </form>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
