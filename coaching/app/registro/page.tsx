// Pantalla: CREAR CUENTA
import type { Metadata } from "next";
import { Suspense } from "react";
import { siYaInicioSesionRedirigir } from "@/lib/sesion";
import PantallaCuenta from "@/componentes/app/PantallaCuenta";
import FormularioCuenta from "@/componentes/app/FormularioCuenta";

export const metadata: Metadata = { title: "Crear cuenta" };

export default function Registro() {
  return (
    <PantallaCuenta titulo="Creá tu cuenta" bajada="Con tu cuenta reservás clases, hacés tus ejercicios y me escribís.">
      {/* Si ya inició sesión, lo manda a su espacio */}
      <Suspense>
        <Redirigir />
      </Suspense>
      <FormularioCuenta modo="registro" />
    </PantallaCuenta>
  );
}

async function Redirigir() {
  return siYaInicioSesionRedirigir();
}
