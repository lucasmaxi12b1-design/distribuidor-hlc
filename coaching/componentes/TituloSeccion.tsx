// Título reutilizable para cada sección (etiqueta chiquita + título + bajada).
type Props = { etiqueta: string; titulo: string; bajada?: string };

export default function TituloSeccion({ etiqueta, titulo, bajada }: Props) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      <p className="mb-3 text-sm font-medium tracking-wide text-terracota">{etiqueta}</p>
      <h2 className="text-3xl font-medium text-tinta md:text-4xl">{titulo}</h2>
      {bajada && <p className="mt-4 text-lg leading-relaxed text-suave">{bajada}</p>}
    </div>
  );
}
