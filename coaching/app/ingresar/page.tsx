// Pantalla: INGRESAR
import type { Metadata } from "next";
import { Suspense } from "react";
import { siYaInicioSesionRedirigir } from "@/lib/sesion";
import PantallaCuenta from "@/componentes/app/PantallaCuenta";
import FormularioCuenta from "@/componentes/app/FormularioCuenta";

export const metadata: Metadata = { title: "Ingresar" };

export default function Ingresar() {
  return (
    <PantallaCuenta titulo="Ingresá a tu espacio" bajada="Tus clases, ejercicios y mensajes, todo en un lugar.">
      {/* Si ya inició sesión, lo manda a su espacio */}
      <Suspense>
        <Redirigir />
      </Suspense>
      <FormularioCuenta modo="ingresar" />
    </PantallaCuenta>
  );
}

async function Redirigir() {
  return siYaInicioSesionRedirigir();
}
