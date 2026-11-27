// Marco del PANEL DEL COACH (menú + contenido). Solo entra el admin.
import Marco from "@/componentes/app/Marco";

const menu = [
  { href: "/panel", texto: "Resumen", icono: "inicio" },
  { href: "/panel/alumnos", texto: "Alumnos", icono: "alumnos" },
  { href: "/panel/ejercicios", texto: "Ejercicios", icono: "ejercicios" },
  { href: "/panel/agenda", texto: "Agenda", icono: "clases" },
  { href: "/panel/consultas", texto: "Consultas", icono: "consultas" },
];

export default function LayoutPanel({ children }: { children: React.ReactNode }) {
  return (
    <Marco items={menu} etiqueta="Panel del coach">
      {children}
    </Marco>
  );
}
