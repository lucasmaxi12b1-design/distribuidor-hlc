// Avisos que aparecen SOLO en el modo demostración
import { CUENTAS_DEMO, modoDemo } from "@/lib/demo";

// Franja chiquita arriba de las pantallas privadas
export function FranjaDemo() {
  if (!modoDemo()) return null;
  return (
    <p className="bg-terracota px-4 py-1.5 text-center text-xs text-white">
      Versión de demostración · los datos de prueba se reinician solos
    </p>
  );
}

// Cuentas de prueba en la pantalla de ingreso
export function CuentasDemo() {
  if (!modoDemo()) return null;
  return (
    <div className="mb-6 rounded-2xl bg-arena p-4 text-sm text-tinta">
      <p className="font-medium">Versión de demostración: probá con estas cuentas</p>
      <ul className="mt-2 space-y-1.5">
        <li>
          <strong>Coach:</strong> <span className="select-all">{CUENTAS_DEMO.coach.email}</span>
        </li>
        <li>
          <strong>Alumna:</strong> <span className="select-all">{CUENTAS_DEMO.alumna.email}</span>
        </li>
        <li>
          <strong>Contraseña (las dos):</strong> <span className="select-all">{CUENTAS_DEMO.coach.clave}</span>
        </li>
      </ul>
    </div>
  );
}
