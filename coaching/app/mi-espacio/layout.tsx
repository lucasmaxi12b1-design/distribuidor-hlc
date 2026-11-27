// Marco del ESPACIO DEL ALUMNO (menú + contenido)
import Marco from "@/componentes/app/Marco";

const menu = [
  { href: "/mi-espacio", texto: "Inicio", icono: "inicio" },
  { href: "/mi-espacio/ejercicios", texto: "Ejercicios", icono: "ejercicios" },
  { href: "/mi-espacio/clases", texto: "Clases", icono: "clases" },
  { href: "/mi-espacio/mensajes", texto: "Mensajes", icono: "mensajes" },
];

export default function LayoutAlumno({ children }: { children: React.ReactNode }) {
  return (
    <Marco items={menu} etiqueta="Mi espacio">
      {children}
    </Marco>
  );
}
