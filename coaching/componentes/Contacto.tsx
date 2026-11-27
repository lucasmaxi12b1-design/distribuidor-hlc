// Sección 7: CONTACTO — WhatsApp, formulario y redes.
// Los datos se editan en contenido/sitio.ts → contacto y contactoSeccion
import { sitio } from "@/contenido/sitio";
import { linkWhatsapp } from "@/lib/enlaces";
import FormularioContacto from "./FormularioContacto";
import IconoWhatsapp from "./IconoWhatsapp";

export default function Contacto() {
  const { contacto, contactoSeccion } = sitio;

  return (
    <section id="contacto" className="px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:gap-16">
        {/* Columna izquierda: texto, WhatsApp y redes */}
        <div>
          <p className="mb-3 text-sm font-medium tracking-wide text-terracota">Contacto</p>
          <h2 className="text-3xl font-medium text-tinta md:text-4xl">{contactoSeccion.titulo}</h2>
          <p className="mt-4 text-lg leading-relaxed text-suave">{contactoSeccion.bajada}</p>

          <a
            href={linkWhatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#25d366] px-7 py-4 font-medium text-white transition hover:brightness-95"
          >
            <IconoWhatsapp />
            {contactoSeccion.botonWhatsapp}
          </a>

          {contacto.email && (
            <p className="mt-6 text-suave">
              O por mail:{" "}
              <a href={`mailto:${contacto.email}`} className="text-salvia underline underline-offset-4">
                {contacto.email}
              </a>
            </p>
          )}

          {/* Redes sociales */}
          <div className="mt-8 flex flex-wrap gap-3">
            {contacto.redes.map((red) => (
              <a
                key={red.nombre}
                href={red.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-tinta/15 px-5 py-2.5 text-sm text-tinta transition hover:border-tinta/40"
              >
                {red.nombre}
              </a>
            ))}
          </div>
        </div>

        {/* Columna derecha: formulario */}
        <div className="rounded-3xl bg-arena p-6 md:p-8">
          <FormularioContacto />
        </div>
      </div>
    </section>
  );
}
