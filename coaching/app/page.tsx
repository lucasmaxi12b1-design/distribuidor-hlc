// Página principal: junta todas las secciones en orden.
// Para cambiar el orden, mové las líneas de lugar.
import Encabezado from "@/componentes/Encabezado";
import Inicio from "@/componentes/Inicio";

export default function Home() {
  return (
    <>
      <Encabezado />
      <main>
        <Inicio />
      </main>
    </>
  );
}
