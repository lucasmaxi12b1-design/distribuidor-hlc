"use client"; // necesita saber en qué página estamos para resaltar el botón

// Menú del espacio privado.
// En el celular es una barra fija abajo (como una app); en la compu, una columna al costado.
import Link from "next/link";
import { usePathname } from "next/navigation";

export type ItemMenu = { href: string; texto: string; icono: string };

// Íconos dibujados con líneas (SVG)
const ICONOS: Record<string, string> = {
  inicio: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
  ejercicios: "M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2",
  clases: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  mensajes: "M4 5h16v11H8l-4 4z",
  alumnos: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21c0-4 3-6 7-6s7 2 7 6M17 11a3 3 0 1 0 0-6M22 21c0-3-2-5-5-5",
  consultas: "M4 4h16v16H4zM4 8l8 5 8-5",
};

// Versión que detecta sola la página actual
export default function Navegacion({ items }: { items: ItemMenu[] }) {
  return <MenuBase items={items} ruta={usePathname()} />;
}

// El menú en sí (también se muestra, sin resaltar, mientras carga la página)
export function MenuBase({ items, ruta }: { items: ItemMenu[]; ruta: string }) {
  // Un ítem está activo si la ruta coincide (el primero solo si es exacta)
  const activo = (href: string, i: number) => (i === 0 ? ruta === href : ruta.startsWith(href));

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-tinta/10 bg-crema/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:static md:flex-col md:gap-1 md:border-0 md:bg-transparent md:pb-0"
      aria-label="Menú"
    >
      {items.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] transition md:flex-none md:flex-row md:gap-3 md:rounded-full md:px-4 md:py-2.5 md:text-sm ${
            activo(item.href, i) ? "text-salvia md:bg-salvia/10" : "text-suave hover:text-tinta"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d={ICONOS[item.icono]} />
          </svg>
          {item.texto}
        </Link>
      ))}
    </nav>
  );
}
