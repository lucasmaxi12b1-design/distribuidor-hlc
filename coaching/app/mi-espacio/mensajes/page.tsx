// ESPACIO DEL ALUMNO — Mensajes con el coach
import { Suspense } from "react";
import { requerirAlumno } from "@/lib/sesion";
import { mensajesDeAlumno } from "@/lib/datos";
import { db } from "@/lib/db";
import { enviarMensajeAlumno } from "@/app/acciones";
import { sitio } from "@/contenido/sitio";
import Cargando from "@/componentes/app/Cargando";
import Titulo from "@/componentes/app/Titulo";
import Conversacion from "@/componentes/app/Conversacion";
import FormularioMensaje from "@/componentes/app/FormularioMensaje";

export default function MensajesAlumno() {
  return (
    <>
      <Titulo bajada={`Escribile a ${sitio.nombre} cuando lo necesites.`}>Mensajes</Titulo>
      <Suspense fallback={<Cargando />}>
        <Contenido />
      </Suspense>
    </>
  );
}

async function Contenido() {
  const u = await requerirAlumno();
  const mensajes = await mensajesDeAlumno(u.id);
  // Al abrir la conversación, los mensajes del coach quedan como leídos
  await db()`update mensajes set leido = true where usuario_id = ${u.id} and de_admin and not leido`;

  return (
    <div className="space-y-4">
      <Conversacion mensajes={mensajes} soyAdmin={false} />
      <FormularioMensaje accion={enviarMensajeAlumno} />
    </div>
  );
}
