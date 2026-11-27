// ESPACIO DEL ALUMNO — Inicio: resumen de su proceso
import { horaActual } from "@/lib/fechas";
import Link from "next/link";
import { Suspense } from "react";
import { requerirAlumno } from "@/lib/sesion";
import { clasesDeAlumno, ejerciciosDeAlumno, mensajesSinLeerAlumno } from "@/lib/datos";
import Cargando from "@/componentes/app/Cargando";
import TarjetaClase from "@/componentes/app/TarjetaClase";
import { boton, tarjeta } from "@/componentes/app/estilos";

export default function InicioAlumno() {
  return (
    <Suspense fallback={<Cargando />}>
      <Contenido />
    </Suspense>
  );
}

async function Contenido() {
  const u = await requerirAlumno();
  const [ejercicios, clases, sinLeer] = await Promise.all([
    ejerciciosDeAlumno(u.id),
    clasesDeAlumno(u.id),
    mensajesSinLeerAlumno(u.id),
  ]);

  const ahora = await horaActual();
  const hechos = ejercicios.filter((e) => e.hecho_en).length;
  const pendientes = ejercicios.length - hechos;
  const porcentaje = ejercicios.length ? Math.round((hechos / ejercicios.length) * 100) : 0;
  const proxima = clases.find((c) => c.inicio.getTime() + c.duracion_min * 60_000 > ahora);
  const tomadas = clases.filter((c) => c.inicio.getTime() + c.duracion_min * 60_000 <= ahora).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-medium text-tinta">Hola, {u.nombre.split(" ")[0]}</h1>
        <p className="mt-1 text-suave">{u.programa ? `Programa: ${u.programa}` : "Este es tu espacio de trabajo."}</p>
      </div>

      {/* Próxima clase */}
      <section>
        <h2 className="mb-3 text-lg font-medium text-tinta">Tu próxima clase</h2>
        {proxima ? (
          <TarjetaClase turno={proxima} ahora={ahora} />
        ) : (
          <div className={`${tarjeta} flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between`}>
            <p className="text-suave">No tenés clases reservadas.</p>
            <Link href="/mi-espacio/clases" className={boton}>Reservar una clase</Link>
          </div>
        )}
      </section>

      {/* Progreso */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className={`${tarjeta} sm:col-span-2`}>
          <p className="text-sm text-suave">Tu avance en ejercicios</p>
          <p className="mt-1 font-titulo text-4xl text-tinta">{porcentaje}%</p>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-arena">
            <div className="h-full rounded-full bg-salvia transition-all" style={{ width: `${porcentaje}%` }} />
          </div>
          <p className="mt-3 text-sm text-suave">
            {hechos} {hechos === 1 ? "hecho" : "hechos"} · {pendientes} {pendientes === 1 ? "pendiente" : "pendientes"}
          </p>
        </div>
        <div className={tarjeta}>
          <p className="text-sm text-suave">Clases tomadas</p>
          <p className="mt-1 font-titulo text-4xl text-tinta">{tomadas}</p>
        </div>
      </section>

      {/* Accesos rápidos */}
      <section className="grid gap-3 sm:grid-cols-2">
        <Link href="/mi-espacio/ejercicios" className={`${tarjeta} transition hover:border-salvia/40`}>
          <p className="font-medium text-tinta">Ejercicios pendientes</p>
          <p className="text-sm text-suave">{pendientes ? `Tenés ${pendientes} para hacer` : "¡Estás al día!"}</p>
        </Link>
        <Link href="/mi-espacio/mensajes" className={`${tarjeta} transition hover:border-salvia/40`}>
          <p className="font-medium text-tinta">Mensajes</p>
          <p className="text-sm text-suave">{sinLeer ? `Tenés ${sinLeer} sin leer` : "Escribime cuando lo necesites"}</p>
        </Link>
      </section>
    </div>
  );
}
