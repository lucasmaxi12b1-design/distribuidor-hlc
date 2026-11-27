"use client"; // muestra si se crearon los turnos

// Formulario del coach para cargar horarios libres
import { useActionState } from "react";
import { crearTurnos } from "@/app/acciones";
import { boton, campo, etiqueta, tarjeta } from "./estilos";

export default function FormularioTurnos() {
  const [estado, accion, creando] = useActionState(crearTurnos, undefined);
  return (
    <form action={accion} className={`${tarjeta} space-y-4`}>
      <h2 className="text-lg font-medium text-tinta">Cargar horario libre</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="fecha" className={etiqueta}>Día</label>
          <input id="fecha" name="fecha" type="date" required className={campo} />
        </div>
        <div>
          <label htmlFor="hora" className={etiqueta}>Hora (Argentina)</label>
          <input id="hora" name="hora" type="time" required step={900} className={campo} />
        </div>
        <div>
          <label htmlFor="duracion" className={etiqueta}>Duración</label>
          <select id="duracion" name="duracion" defaultValue="60" className={campo}>
            <option value="30">30 minutos</option>
            <option value="45">45 minutos</option>
            <option value="60">60 minutos</option>
            <option value="90">90 minutos</option>
          </select>
        </div>
        <div>
          <label htmlFor="semanas" className={etiqueta}>Repetir</label>
          <select id="semanas" name="semanas" defaultValue="1" className={campo}>
            <option value="1">Solo ese día</option>
            <option value="4">Todas las semanas, 4 semanas</option>
            <option value="8">Todas las semanas, 8 semanas</option>
            <option value="12">Todas las semanas, 12 semanas</option>
          </select>
        </div>
      </div>
      {estado?.error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">{estado.error}</p>}
      {estado?.ok && <p className="rounded-2xl bg-salvia/10 px-4 py-3 text-sm text-salvia-oscuro">{estado.ok}</p>}
      <button disabled={creando} className={boton}>{creando ? "Creando…" : "Agregar horario"}</button>
    </form>
  );
}
