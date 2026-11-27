"use client"; // pregunta "¿Seguro?" antes de borrar

// Botón que pide confirmación antes de enviar el formulario
export default function BotonConfirmar({ pregunta, children, className }: { pregunta: string; children: React.ReactNode; className?: string }) {
  return (
    <button
      className={className}
      onClick={(e) => {
        if (!window.confirm(pregunta)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
