"use client"; // necesario porque el menú del celular se abre y se cierra

// Encabezado fijo arriba: logo (nombre de la marca), menú y botón de reserva.
// En el celular el menú se esconde detrás de un botón "☰".
import Link from "next/link";
import { useState } from "react";
import { sitio } from "@/contenido/sitio";

export default function Encabezado() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-tinta/5 bg-crema/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* Nombre de la marca: lleva al inicio */}
        <a href="#inicio" className="font-titulo text-xl font-semibold text-salvia">
          {sitio.marca}
        </a>

        {/* Menú en compu */}
        <nav className="hidden items-center gap-8 md:flex">
          {sitio.menu.map((item) => (
            <a key={item.destino} href={item.destino} className="text-sm text-suave transition hover:text-tinta">
              {item.texto}
            </a>
          ))}
          <Link href="/ingresar" className="text-sm font-medium text-salvia transition hover:text-salvia-oscuro">
            Ingresar
          </Link>
          <a
            href="#reservar"
            className="rounded-full bg-salvia px-5 py-2.5 text-sm font-medium text-white transition hover:bg-salvia-oscuro"
          >
            {sitio.inicio.boton}
          </a>
        </nav>

        {/* Botón ☰ en celular */}
        <button
          onClick={() => setAbierto(!abierto)}
          className="-mr-2 p-2 text-tinta md:hidden"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Menú desplegado en celular */}
      {abierto && (
        <nav className="border-t border-tinta/5 bg-crema px-5 pb-6 md:hidden">
          {sitio.menu.map((item) => (
            <a
              key={item.destino}
              href={item.destino}
              onClick={() => setAbierto(false)}
              className="block border-b border-tinta/5 py-4 text-lg text-tinta"
            >
              {item.texto}
            </a>
          ))}
          <Link href="/ingresar" className="block border-b border-tinta/5 py-4 text-lg font-medium text-salvia">
            Ingresar a mi espacio
          </Link>
          <a
            href="#reservar"
            onClick={() => setAbierto(false)}
            className="mt-6 block rounded-full bg-salvia py-3.5 text-center font-medium text-white"
          >
            {sitio.inicio.boton}
          </a>
        </nav>
      )}
    </header>
  );
}
