// Marco de las pantallas privadas: encabezado con la marca y el botón "Salir",
// el menú y el contenido de cada página.
import Link from "next/link";
import { Suspense } from "react";
import { sitio } from "@/contenido/sitio";
import { salir } from "@/app/acciones";
import Navegacion, { MenuBase, type ItemMenu } from "./Navegacion";
import { FranjaDemo } from "./AvisoDemo";

export default function Marco({ items, etiqueta, children }: { items: ItemMenu[]; etiqueta: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <FranjaDemo />
      <header className="sticky top-0 z-30 border-b border-tinta/5 bg-crema/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <Link href="/" className="font-titulo text-lg font-semibold text-salvia">
            {sitio.marca}
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-arena px-3 py-1 text-xs text-suave sm:inline">{etiqueta}</span>
            <form action={salir}>
              <button className="text-sm text-suave hover:text-tinta">Salir</button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl gap-8 px-5 pt-6 pb-28 md:grid md:grid-cols-[200px_1fr] md:pb-16">
        <aside className="md:sticky md:top-20 md:self-start">
          <Suspense fallback={<MenuBase items={items} ruta="" />}>
            <Navegacion items={items} />
          </Suspense>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
