// Lo que se ve mientras carga una pantalla
export default function Cargando() {
  return (
    <div className="space-y-4" aria-label="Cargando">
      <div className="h-8 w-48 animate-pulse rounded-full bg-tinta/5" />
      <div className="h-28 animate-pulse rounded-3xl bg-tinta/5" />
      <div className="h-28 animate-pulse rounded-3xl bg-tinta/5" />
    </div>
  );
}
