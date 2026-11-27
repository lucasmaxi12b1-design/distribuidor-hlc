// PANEL — Resumen: lo más importante de un vistazo
import { horaActual } from "@/lib/fechas";
import Link from "next/link";
import { Suspense } from "react";
import { requerirAdmin } from "@/lib/sesion";
import { agendaProxima, resumenPanel } from "@/lib/datos";
import Cargando from "@/componentes/app/Cargando";
import TarjetaClase from "@/componentes/app/TarjetaClase";
import Vacio from "@/componentes/app/Vacio";
import { tarjeta } from "@/componentes/app/estilos";

export default function Panel() {
  return (
    <Suspense fallback={<Cargando />}>
      <Contenido />
    </Suspense>
  );
}

async function Contenido() {
  const u = await requerirAdmin();
  const [r, agenda] = await Promise.all([resumenPanel(), agendaProxima()]);
  const ahora = await horaActual();
  const proximas = agenda.filter((t) => t.alumno_id && t.inicio.getTime() + t.duracion_min * 60_000 > ahora).slice(0, 5);

  const cifras = [
    { texto: "Alumnos", valor: r.alumnos, href: "/panel/alumnos" },
    { texto: "Clases esta semana", valor: r.clases_semana, href: "/panel/agenda" },
    { texto: "Mensajes sin leer", valor: r.mensajes, href: "/panel/alumnos" },
    { texto: "Consultas nuevas", valor: r.consultas, href: "/panel/consultas" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-medium text-tinta">Hola, {u.nombre.split(" ")[0]}</h1>
        <p className="mt-1 text-suave">
          {r.pendientes === 1 ? "1 ejercicio pendiente" : `${r.pendientes} ejercicios pendientes`} entre todos tus alumnos.
        </p>
      </div>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cifras.map((c) => (
          <Link key={c.texto} href={c.href} className={`${tarjeta} transition hover:border-salvia/40`}>
            <p className="font-titulo text-3xl text-tinta">{c.valor}</p>
            <p className="mt-1 text-sm text-suave">{c.texto}</p>
          </Link>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium text-tinta">Próximas clases</h2>
        {proximas.length ? (
          proximas.map((t) => <TarjetaClase key={t.id} turno={t} ahora={ahora} nombreAlumno={t.alumno_nombre} />)
        ) : (
          <Vacio>No hay clases reservadas. Cargá horarios libres en Agenda.</Vacio>
        )}
      </section>
    </div>
  );
}
