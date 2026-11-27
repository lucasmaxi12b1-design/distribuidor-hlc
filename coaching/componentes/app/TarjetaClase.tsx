// Tarjeta de una clase reservada, con el botón para entrar a la videollamada.
import { fechaHora } from "@/lib/fechas";
import { boton, botonChico, tarjeta } from "./estilos";

type Props = {
  turno: { id: number; inicio: Date; duracion_min: number; sala: string };
  ahora: number; // hora actual (en milisegundos)
  cancelar?: (fd: FormData) => Promise<void>;
  nombreAlumno?: string | null;
};

// La sala se habilita 15 minutos antes y se cierra al terminar la clase
const MIN_ANTES = 15;

export default function TarjetaClase({ turno, ahora, cancelar, nombreAlumno }: Props) {
  const inicio = turno.inicio.getTime();
  const fin = inicio + turno.duracion_min * 60_000;
  const habilitada = ahora >= inicio - MIN_ANTES * 60_000 && ahora <= fin;
  const sePuedeCancelar = inicio - ahora > 24 * 60 * 60_000;

  return (
    <div className={`${tarjeta} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}>
      <div>
        <p className="font-medium text-tinta first-letter:uppercase">{fechaHora(turno.inicio)} hs</p>
        <p className="text-sm text-suave">
          {nombreAlumno ? `${nombreAlumno} · ` : ""}
          {turno.duracion_min} minutos · por videollamada
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {habilitada ? (
          <a href={`https://meet.jit.si/${turno.sala}`} target="_blank" rel="noopener noreferrer" className={boton}>
            Entrar a la clase
          </a>
        ) : (
          <span className="text-sm text-suave">La sala se abre {MIN_ANTES} min antes</span>
        )}
        {cancelar && sePuedeCancelar && (
          <form action={cancelar}>
            <input type="hidden" name="id" value={turno.id} />
            <button className={botonChico}>Cancelar</button>
          </form>
        )}
      </div>
    </div>
  );
}
