"use client"; // necesario porque el formulario reacciona a lo que escribe la persona

// Formulario simple: al enviarlo, abre WhatsApp con el mensaje ya escrito.
// Así no necesitás servidor ni servicios pagos para recibir los mensajes.
import { useState } from "react";
import { linkWhatsapp } from "@/lib/enlaces";

export default function FormularioContacto() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  function enviar(e: React.FormEvent) {
    e.preventDefault(); // evita que la página se recargue
    const texto = `¡Hola! Soy ${nombre}.\n\n${mensaje}`;
    window.open(linkWhatsapp(texto), "_blank");
  }

  const estiloCampo =
    "w-full rounded-2xl border border-tinta/15 bg-white px-4 py-3.5 text-base text-tinta outline-none transition placeholder:text-suave/60 focus:border-salvia focus:ring-2 focus:ring-salvia/20";

  return (
    <form onSubmit={enviar} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-tinta">
          Tu nombre
        </label>
        <input
          id="nombre"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={estiloCampo}
          placeholder="¿Cómo te llamás?"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="mensaje" className="mb-1.5 block text-sm font-medium text-tinta">
          Tu mensaje
        </label>
        <textarea
          id="mensaje"
          required
          rows={4}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className={estiloCampo}
          placeholder="Contame brevemente en qué te gustaría trabajar"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-salvia py-4 font-medium text-white transition hover:bg-salvia-oscuro"
      >
        Enviar mensaje
      </button>
      <p className="text-center text-xs text-suave">Al enviarlo se abre WhatsApp con tu mensaje listo para mandar.</p>
    </form>
  );
}
