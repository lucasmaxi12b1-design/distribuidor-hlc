"use client"; // se limpia solo después de enviar y se actualiza cada tanto

// Caja para escribir un mensaje. También revisa si llegaron mensajes nuevos cada 15 segundos.
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { boton, campo } from "./estilos";

type Props = { accion: (fd: FormData) => Promise<void>; alumnoId?: number };

export default function FormularioMensaje({ accion, alumnoId }: Props) {
  const formulario = useRef<HTMLFormElement>(null);
  const router = useRouter();

  // Busca mensajes nuevos cada 15 segundos
  useEffect(() => {
    const intervalo = setInterval(() => router.refresh(), 15_000);
    return () => clearInterval(intervalo);
  }, [router]);

  return (
    <form
      ref={formulario}
      action={async (fd) => {
        await accion(fd);
        formulario.current?.reset();
      }}
      className="flex items-end gap-2 pt-3"
    >
      {alumnoId && <input type="hidden" name="alumno_id" value={alumnoId} />}
      <label htmlFor="texto" className="sr-only">Mensaje</label>
      <textarea id="texto" name="texto" required rows={2} placeholder="Escribí tu mensaje…" className={`${campo} resize-none`} />
      <button className={`${boton} shrink-0`}>Enviar</button>
    </form>
  );
}
