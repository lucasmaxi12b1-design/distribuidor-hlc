# Web de coaching — Guía rápida

## ✏️ Cómo editar textos, precios y servicios

Todo está en **un solo archivo**: `contenido/sitio.ts`.
Los textos marcados con `✏️ REVISAR` son de ejemplo: cambialos por los tuyos.

| Quiero cambiar…                     | Dónde                                                   |
| ----------------------------------- | ------------------------------------------------------- |
| Textos, precios, programas, preguntas | `contenido/sitio.ts`                                  |
| Mi número de WhatsApp y redes       | `contenido/sitio.ts` → `contacto`                       |
| El link del calendario (Cal.com/Calendly) | `contenido/sitio.ts` → `linkReservas`             |
| Mi foto                             | Subí `public/foto-perfil.jpg` y poné `foto: "/foto-perfil.jpg"` en `sobreMi` |
| Agregar testimonios reales          | `contenido/sitio.ts` → `testimonios.lista`              |
| Activar Mercado Pago                | `contenido/sitio.ts` → `linkPago` de cada programa y `pagosOnline: true` |
| Colores                             | `app/globals.css` (arriba de todo)                      |
| Íconos de la app                    | `public/iconos/` y `app/icon.png`, `app/apple-icon.png` (mismos tamaños) |

**Editar desde el celular o el navegador (sin instalar nada):** entrá a tu repositorio
en github.com, abrí `coaching/contenido/sitio.ts`, tocá el lápiz ✏️, cambiá el texto y tocá
**Commit changes**. Si la web ya está en Vercel, se actualiza sola en 1 o 2 minutos.

## 💻 Verla en tu compu

Necesitás [Node.js](https://nodejs.org) (versión LTS). En la terminal, dentro de esta carpeta:

```bash
npm install     # solo la primera vez
npm run dev     # prende la web
```

Abrí http://localhost:3000. Para apagarla: `Ctrl + C`.

---

## 🚀 1. Publicarla gratis en Vercel

1. Entrá a **vercel.com** → **Sign Up** → **Continue with GitHub** (plan *Hobby*, gratis).
2. Tocá **Add New… → Project** y elegí el repositorio `distribuidor-hlc` → **Import**.
3. En **Root Directory** tocá **Edit** y elegí la carpeta **`coaching`**. ⚠️ Este paso es clave,
   porque el repositorio también tiene la web de la distribuidora.
4. Lo demás dejalo como viene (Vercel detecta Next.js solo) → **Deploy**.
5. En 1 o 2 minutos te da una dirección tipo `https://tu-proyecto.vercel.app`. ¡Ya está online!
6. Copiá esa dirección en `contenido/sitio.ts` → `url` (sirve para la vista previa en WhatsApp).

> **Sobre la rama:** Vercel publica como "oficial" la rama `main`. La web está ahora en la rama
> `claude/loving-franklin-dk77op`. Tenés dos opciones:
> - Unir esa rama a `main` en GitHub (con un *Pull Request*). La tienda en Netlify no se ve
>   afectada, porque Netlify solo publica la carpeta `site`.
> - O en Vercel: **Settings → Environments → Production → Branch Tracking** y poner esa rama.
>
> Más adelante te conviene mover la carpeta `coaching` a un repositorio propio.

Cada vez que cambies algo en GitHub, Vercel vuelve a publicar solo.

## 🌐 2. Conectar tu dominio propio (.com.ar)

1. **Registrá el dominio** en **nic.ar** (necesitás CUIT/CUIL y clave fiscal de ARCA).
   Buscá el nombre, pagá el registro anual y listo.
2. **En Vercel:** entrá al proyecto → **Settings → Domains** → escribí `tudominio.com.ar` → **Add**.
   Aceptá también agregar `www.tudominio.com.ar`.
3. Vercel te va a mostrar cómo configurarlo. Para `.com.ar`, lo más fácil es **delegar** el
   dominio a Vercel:
   - En **nic.ar** → **Mis dominios** → tu dominio → **Delegar**.
   - Cargá estos dos servidores (DNS):
     - `ns1.vercel-dns.com`
     - `ns2.vercel-dns.com`
   - Guardá.
4. Esperá. Puede tardar de unos minutos a 24/48 horas. Cuando en Vercel aparezca **Valid Configuration**
   ✅, tu web ya funciona en tu dominio, con candadito de seguridad (HTTPS) gratis.
5. Cambiá `url` en `contenido/sitio.ts` por `https://tudominio.com.ar`.

## 📱 3. Instalarla como app

**Android (Chrome):** entrá a tu web → abajo de todo tocá **Instalar app** (o el menú ⋮ →
**Instalar aplicación** / **Agregar a la pantalla principal**).

**iPhone (Safari, tiene que ser Safari):** entrá a tu web → tocá **Compartir** (el cuadrado con la
flecha hacia arriba) → **Agregar a inicio** → **Agregar**.

**Compu (Chrome o Edge):** en la barra de direcciones aparece un ícono de instalar (un monitor
con una flecha) → **Instalar**. También podés usar el botón **Instalar app** del pie de página.

La app abre en pantalla completa, sin barra del navegador, con el ícono de la marca.

> La instalación solo funciona con la web publicada (con `https://`), no en `localhost` desde otro aparato.

## ✅ Checklist antes de compartir el link

- [ ] Cambiar todos los textos `✏️ REVISAR` de `contenido/sitio.ts`
- [ ] Poner tu número de WhatsApp real y tus redes
- [ ] Subir tu foto
- [ ] Crear tu cuenta en Cal.com o Calendly y pegar el link en `linkReservas`
- [ ] Poner la dirección final en `url`
- [ ] Probar el link en WhatsApp (mandátelo a vos), para ver la vista previa
