"use client"; // muestra errores al instante

// Formulario para ingresar o crear una cuenta.
import Link from "next/link";
import { useActionState } from "react";
import { ingresar, registrarse } from "@/app/acciones";
import { boton, campo, etiqueta } from "./estilos";

export default function FormularioCuenta({ modo }: { modo: "ingresar" | "registro" }) {
  const esRegistro = modo === "registro";
  const [estado, accion, enviando] = useActionState(esRegistro ? registrarse : ingresar, undefined);

  return (
    <form action={accion} className="space-y-4">
      {esRegistro && (
        <div>
          <label htmlFor="nombre" className={etiqueta}>Tu nombre</label>
          <input id="nombre" name="nombre" required autoComplete="name" className={campo} />
        </div>
      )}
      <div>
        <label htmlFor="email" className={etiqueta}>Mail</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={campo} />
      </div>
      <div>
        <label htmlFor="clave" className={etiqueta}>Contraseña</label>
        <input
          id="clave"
          name="clave"
          type="password"
          required
          minLength={esRegistro ? 8 : undefined}
          autoComplete={esRegistro ? "new-password" : "current-password"}
          className={campo}
        />
        {esRegistro && <p className="mt-1.5 text-xs text-suave">Mínimo 8 caracteres.</p>}
      </div>

      {estado?.error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{estado.error}</p>}

      <button disabled={enviando} className={`${boton} w-full py-3.5`}>
        {enviando ? "Un momento…" : esRegistro ? "Crear mi cuenta" : "Ingresar"}
      </button>

      <p className="text-center text-sm text-suave">
        {esRegistro ? (
          <>¿Ya tenés cuenta? <Link href="/ingresar" className="text-salvia underline underline-offset-4">Ingresá</Link></>
        ) : (
          <>¿Todavía no tenés cuenta? <Link href="/registro" className="text-salvia underline underline-offset-4">Creala acá</Link></>
        )}
      </p>
      {!esRegistro && (
        <p className="text-center text-xs text-suave">¿Te olvidaste la contraseña? Escribime y te genero una nueva.</p>
      )}
    </form>
  );
}
