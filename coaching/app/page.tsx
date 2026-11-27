// Página principal: junta todas las secciones en orden.
// Para cambiar el orden, mové las líneas de lugar.
import Encabezado from "@/componentes/Encabezado";
import Inicio from "@/componentes/Inicio";
import SobreMi from "@/componentes/SobreMi";
import Servicios from "@/componentes/Servicios";
import ComoFunciona from "@/componentes/ComoFunciona";
import Testimonios from "@/componentes/Testimonios";
import Reservar from "@/componentes/Reservar";
import Preguntas from "@/componentes/Preguntas";
import Contacto from "@/componentes/Contacto";
import Pie from "@/componentes/Pie";
import BotonWhatsappFlotante from "@/componentes/BotonWhatsappFlotante";

export default function Home() {
  return (
    <>
      <Encabezado />
      <main>
        <Inicio />
        <SobreMi />
        <Servicios />
        <ComoFunciona />
        <Testimonios /> {/* aparece solo cuando cargues testimonios */}
        <Reservar />
        <Preguntas />
        <Contacto />
      </main>
      <Pie />
      <BotonWhatsappFlotante />
    </>
  );
}
