"use client";

// Activa el "service worker" (public/sw.js): un archivo que el navegador
// guarda para que la app abra más rápido y se pueda instalar.
import { useEffect } from "react";

export default function RegistrarServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Si falla no pasa nada grave: la web sigue funcionando normal.
      });
    }
  }, []);
  return null;
}
