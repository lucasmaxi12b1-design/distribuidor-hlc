// Sección 7: CONTACTO — formulario (llega al panel del coach) y redes.
// Los datos se editan en contenido/sitio.ts → contacto y contactoSeccion
import Link from "next/link";
import { sitio } from "@/contenido/sitio";
import FormularioContacto from "./FormularioContacto";

export default function Contacto() {
  const { contacto, contactoSeccion } = sitio;

  return (
    <section id="contacto" className="px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:gap-16">
        {/* Columna izquierda: texto y redes */}
        <div>
          <p className="mb-3 text-sm font-medium tracking-wide text-terracota">Contacto</p>
          <h2 className="text-3xl font-medium text-tinta md:text-4xl">{contactoSeccion.titulo}</h2>
          <p className="mt-4 text-lg leading-relaxed text-suave">{contactoSeccion.bajada}</p>
          <p className="mt-6 text-suave">
            ¿Ya sos alumno?{" "}
            <Link href="/mi-espacio/mensajes" className="text-salvia underline underline-offset-4">Escribime desde tu espacio</Link>.
          </p>

          {contacto.email && (
            <p className="mt-4 text-suave">
              Mail: <a href={`mailto:${contacto.email}`} className="text-salvia underline underline-offset-4">{contacto.email}</a>
            </p>
          )}

          {/* Redes sociales */}
          {contacto.redes.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {contacto.redes.map((red) => (
                <a key={red.nombre} href={red.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-tinta/15 px-5 py-2.5 text-sm text-tinta transition hover:border-tinta/40">
                  {red.nombre}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Columna derecha: formulario */}
        <div className="rounded-3xl bg-arena p-6 md:p-8">
          <FormularioContacto />
        </div>
      </div>
    </section>
  );
}
