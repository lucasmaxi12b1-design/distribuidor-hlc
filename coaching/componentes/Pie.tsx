// PIE DE PÁGINA — marca, frase, botón para instalar la app y año.
import { sitio } from "@/contenido/sitio";
import BotonInstalar from "./BotonInstalar";

export default function Pie() {
  return (
    <footer className="bg-salvia-oscuro px-5 pt-14 pb-24 text-white/80 md:pb-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <p className="font-titulo text-2xl text-white">{sitio.marca}</p>
        <p>{sitio.pie.frase}</p>
        <BotonInstalar />
        <p className="text-sm text-white/60">
          © {sitio.nombre} · Clases personalizadas por videollamada
        </p>
      </div>
    </footer>
  );
}
