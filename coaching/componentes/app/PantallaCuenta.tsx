// Diseño de las pantallas de ingreso y registro (tarjeta centrada)
import Link from "next/link";
import { sitio } from "@/contenido/sitio";
import { CuentasDemo } from "./AvisoDemo";

export default function PantallaCuenta({ titulo, bajada, children }: { titulo: string; bajada: string; children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <Link href="/" className="mb-8 font-titulo text-2xl font-semibold text-salvia">{sitio.marca}</Link>
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-sm ring-1 ring-tinta/5 md:p-8">
        <h1 className="text-2xl font-medium text-tinta">{titulo}</h1>
        <p className="mt-2 mb-6 text-suave">{bajada}</p>
        <CuentasDemo />
        {children}
      </div>
    </main>
  );
}
