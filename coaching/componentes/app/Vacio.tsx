// Mensaje para cuando una lista está vacía
export default function Vacio({ children }: { children: React.ReactNode }) {
  return <p className="rounded-3xl border border-dashed border-tinta/15 px-6 py-10 text-center text-suave">{children}</p>;
}
