// Formatos de fecha y hora, siempre en hora de Argentina.
const ZONA = "America/Argentina/Buenos_Aires";

// "jueves 4 de diciembre, 18:00"
export function fechaHora(d: Date) {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: ZONA, weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).format(d);
}

// "jueves 4 de diciembre"
export function soloFecha(d: Date) {
  return new Intl.DateTimeFormat("es-AR", { timeZone: ZONA, weekday: "long", day: "numeric", month: "long" }).format(d);
}

// "18:00"
export function soloHora(d: Date) {
  return new Intl.DateTimeFormat("es-AR", { timeZone: ZONA, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(d);
}

// Fecha guardada como "AAAA-MM-DD" → "4 de diciembre"
export function fechaCorta(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("es-AR", { timeZone: "UTC", day: "numeric", month: "long" }).format(new Date(Date.UTC(a, m - 1, d)));
}

// "hace 5 minutos", "ayer 18:00", etc. (para los mensajes)
export function cuando(d: Date) {
  return new Intl.DateTimeFormat("es-AR", { timeZone: ZONA, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(d);
}

// Agrupa una lista de turnos por día (para mostrarlos ordenados)
export function porDia<T extends { inicio: Date }>(lista: T[]) {
  const grupos = new Map<string, T[]>();
  for (const t of lista) {
    const clave = soloFecha(t.inicio);
    grupos.set(clave, [...(grupos.get(clave) ?? []), t]);
  }
  return [...grupos.entries()];
}

// Hora actual en milisegundos. Las pantallas privadas se arman en el servidor
// una vez por visita, así que la hora es la del momento en que se abre la página.
export function horaActual() {
  return Date.now();
}
