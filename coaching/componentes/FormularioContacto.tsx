"use client"; // muestra el aviso de "enviado" o los errores

// Formulario de contacto: el mensaje queda guardado en el panel del coach (Consultas).
import { useActionState } from "react";
import { enviarConsulta } from "@/app/acciones";

export default function FormularioContacto() {
  const [estado, accion, enviando] = useActionState(enviarConsulta, undefined);

  const estiloCampo =
    "w-full rounded-2xl border border-tinta/15 bg-white px-4 py-3.5 text-base text-tinta outline-none transition placeholder:text-suave/60 focus:border-salvia focus:ring-2 focus:ring-salvia/20";

  // Después de enviar, mostramos el agradecimiento en lugar del formulario
  if (estado?.ok) {
    return <p className="rounded-2xl bg-salvia/10 px-5 py-8 text-center text-lg text-salvia-oscuro" role="status">{estado.ok}</p>;
  }

  return (
    <form action={accion} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-tinta">Tu nombre</label>
        <input id="nombre" name="nombre" required className={estiloCampo} placeholder="¿Cómo te llamás?" autoComplete="name" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-tinta">Tu mail</label>
        <input id="email" name="email" type="email" required className={estiloCampo} placeholder="Para poder responderte" autoComplete="email" />
      </div>
      <div>
        <label htmlFor="mensaje" className="mb-1.5 block text-sm font-medium text-tinta">Tu mensaje</label>
        <textarea id="mensaje" name="mensaje" required rows={4} maxLength={3000} className={estiloCampo} placeholder="Contame brevemente en qué te gustaría trabajar" />
      </div>
      {estado?.error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{estado.error}</p>}
      <button disabled={enviando} className="w-full rounded-full bg-salvia py-4 font-medium text-white transition hover:bg-salvia-oscuro disabled:opacity-60">
        {enviando ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
