// Título de cada pantalla del espacio privado
export default function Titulo({ children, bajada }: { children: React.ReactNode; bajada?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-medium text-tinta">{children}</h1>
      {bajada && <p className="mt-2 text-suave">{bajada}</p>}
    </div>
  );
}
