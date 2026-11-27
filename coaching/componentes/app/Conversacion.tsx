// Lista de mensajes estilo chat (los del coach a la izquierda, los propios a la derecha)
import { cuando } from "@/lib/fechas";
import type { Mensaje } from "@/lib/datos";

export default function Conversacion({ mensajes, soyAdmin }: { mensajes: Mensaje[]; soyAdmin: boolean }) {
  if (!mensajes.length) {
    return <p className="py-10 text-center text-suave">Todavía no hay mensajes. ¡Escribí el primero!</p>;
  }
  return (
    <ul className="space-y-3">
      {mensajes.map((m) => {
        const propio = m.de_admin === soyAdmin;
        return (
          <li key={m.id} className={`flex ${propio ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-3xl px-4 py-2.5 ${
                propio ? "rounded-br-lg bg-salvia text-white" : "rounded-bl-lg bg-white text-tinta ring-1 ring-tinta/10"
              }`}
            >
              <p className="whitespace-pre-line">{m.texto}</p>
              <p className={`mt-1 text-[11px] ${propio ? "text-white/70" : "text-suave"}`}>{cuando(m.creado)}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
