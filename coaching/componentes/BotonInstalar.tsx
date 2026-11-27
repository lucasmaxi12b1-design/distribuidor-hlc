"use client"; // necesario porque usa funciones del navegador

// Botón "Instalar app".
// - En Android y en compu (Chrome/Edge): abre la ventanita de instalación.
// - En iPhone (Safari) no existe esa ventanita, así que mostramos cómo hacerlo a mano.
// - Si la app ya está instalada (o el navegador no lo permite), no muestra nada.
import { useEffect, useState, useSyncExternalStore } from "react";

// Tipo del evento que manda el navegador cuando la web se puede instalar
type EventoInstalacion = Event & { prompt: () => Promise<void> };

// ¿Ya se está usando como app instalada?
function yaInstalada() {
  return window.matchMedia("(display-mode: standalone)").matches;
}

// ¿Es un iPhone/iPad que todavía no instaló la app?
function esIphoneSinInstalar() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) && !yaInstalada();
}
const sinSuscripcion = () => () => {};

export default function BotonInstalar() {
  const [eventoInstalar, setEventoInstalar] = useState<EventoInstalacion | null>(null);
  // Se calcula solo en el navegador (en el servidor siempre da false)
  const esIphone = useSyncExternalStore(sinSuscripcion, esIphoneSinInstalar, () => false);
  const [verAyudaIphone, setVerAyudaIphone] = useState(false);

  useEffect(() => {
    // Si ya está instalada, no mostramos el botón
    if (yaInstalada()) return;

    // Chrome/Edge/Android avisan con este evento que la web se puede instalar
    const guardarEvento = (e: Event) => {
      e.preventDefault();
      setEventoInstalar(e as EventoInstalacion);
    };
    window.addEventListener("beforeinstallprompt", guardarEvento);
    return () => window.removeEventListener("beforeinstallprompt", guardarEvento);
  }, []);

  const estiloBoton =
    "inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm text-white transition hover:bg-white/10";
  const icono = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
    </svg>
  );

  // Android / compu
  if (eventoInstalar) {
    return (
      <button
        className={estiloBoton}
        onClick={async () => {
          await eventoInstalar.prompt();
          setEventoInstalar(null);
        }}
      >
        {icono} Instalar app
      </button>
    );
  }

  // iPhone
  if (esIphone) {
    return (
      <div className="max-w-xs">
        <button className={estiloBoton} onClick={() => setVerAyudaIphone(!verAyudaIphone)}>
          {icono} Instalar app
        </button>
        {verAyudaIphone && (
          <p className="mt-3 text-sm text-white/80">
            En Safari, tocá el botón <strong>Compartir</strong> (el cuadrado con la flecha) y después{" "}
            <strong>“Agregar a inicio”</strong>.
          </p>
        )}
      </div>
    );
  }

  return null;
}
