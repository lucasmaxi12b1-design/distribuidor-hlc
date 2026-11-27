"use client"; // muestra la contraseña nueva en pantalla

// Genera una contraseña temporal para un alumno que se la olvidó
import { useActionState } from "react";
import { nuevaClave } from "@/app/acciones";
import { botonChico } from "./estilos";

export default function BotonNuevaClave({ alumnoId }: { alumnoId: number }) {
  const [estado, accion, generando] = useActionState(nuevaClave, undefined);
  return (
    <form action={accion} className="space-y-2">
      <input type="hidden" name="alumno_id" value={alumnoId} />
      <button disabled={generando} className={botonChico}>Generar contraseña nueva</button>
      {estado?.ok && (
        <p className="rounded-2xl bg-arena px-4 py-3 text-sm text-tinta">
          Nueva contraseña: <strong className="font-mono text-base select-all">{estado.ok}</strong>
          <br />
          Pasásela al alumno. Va a poder ingresar con ella.
        </p>
      )}
    </form>
  );
}
