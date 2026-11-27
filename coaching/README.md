# Lisandro Coaching — Guía rápida

La web tiene tres partes:

| Parte                 | Dirección     | Para quién                                                                 |
| --------------------- | ------------- | -------------------------------------------------------------------------- |
| Página pública        | `/`           | Cualquier persona: presentación, programas, preguntas y formulario de contacto |
| Espacio del alumno    | `/mi-espacio` | Alumnos con cuenta: clases, ejercicios, mensajes y progreso                 |
| Panel del coach       | `/panel`      | Solo vos: alumnos, ejercicios, agenda, mensajes y consultas                 |

---

## ✏️ Cómo editar textos, precios y servicios

Todo está en **un solo archivo**: `contenido/sitio.ts`.
Los textos marcados con `✏️ REVISAR` son de ejemplo: cambialos por los tuyos.

| Quiero cambiar…                           | Dónde                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| Textos, precios, programas, preguntas     | `contenido/sitio.ts`                                                      |
| Mi mail y redes (en la página)            | `contenido/sitio.ts` → `contacto`                                         |
| Mi foto                                   | Subí `public/foto-perfil.jpg` y poné `foto: "/foto-perfil.jpg"` en `sobreMi` |
| Agregar testimonios reales                | `contenido/sitio.ts` → `testimonios.lista`                                |
| Activar Mercado Pago                      | `contenido/sitio.ts` → `linkPago` de cada programa y `pagosOnline: true`  |
| Colores                                   | `app/globals.css` (arriba de todo)                                        |

> Los nombres de los programas de `sitio.ts` son los mismos que aparecen en el panel
> para asignar programas y ejercicios. Si cambiás un nombre, volvé a asignar el programa a sus alumnos.

**Editar desde el celular (sin instalar nada):** en github.com abrí `coaching/contenido/sitio.ts`,
tocá el lápiz ✏️, cambiá el texto y tocá **Commit changes**. Vercel publica el cambio solo en 1 o 2 minutos.

---

## 🚀 1. Publicarla en Vercel (gratis)

1. Entrá a **vercel.com** → **Sign Up** → **Continue with GitHub** (plan *Hobby*, gratis).
2. **Add New… → Project** → elegí el repositorio `distribuidor-hlc` → **Import**.
3. En **Root Directory** tocá **Edit** y elegí la carpeta **`coaching`**. ⚠️ Es clave, porque el
   repositorio también tiene la web de la distribuidora.
4. Abrí **Environment Variables** y agregá:
   - **Key:** `ADMIN_EMAIL` · **Value:** el mail con el que vas a entrar al panel (ej: `lisandro@gmail.com`).
5. Tocá **Deploy**. En 1 o 2 minutos te da una dirección tipo `https://tu-proyecto.vercel.app`.

### Crear la base de datos (una sola vez)

Sin base de datos, la página pública funciona, pero el sistema (cuentas, clases, ejercicios) no.

1. En tu proyecto de Vercel → pestaña **Storage** → **Create Database** → elegí **Neon** (Postgres, plan gratis).
2. Nombrala (ej: `lisandro-coaching`), región **São Paulo** si aparece (es la más cercana) → **Create**.
3. Cuando te pregunte, **conectala a tu proyecto** (deja marcados todos los entornos).
   Vercel agrega sola la variable `DATABASE_URL`: no tenés que copiar ninguna clave.
4. Andá a **Deployments** → en el último, menú **⋯** → **Redeploy**.

Las tablas se crean solas la primera vez que alguien usa el sistema.

### Crear tu cuenta de coach

1. Entrá a `https://tu-proyecto.vercel.app/registro`.
2. Registrate con **el mismo mail que pusiste en `ADMIN_EMAIL`**. Vas a entrar directo a tu panel.
3. Desde ahí: cargá horarios en **Agenda** y creá **Ejercicios**.

> **Sobre la rama:** Vercel publica como oficial la rama `main`. La web está en la rama
> `claude/loving-franklin-dk77op`. Uní esa rama a `main` en GitHub (con un *Pull Request*) o, en Vercel,
> andá a **Settings → Environments → Production → Branch Tracking** y elegí esa rama. La tienda de Netlify
> no se ve afectada: Netlify solo publica la carpeta `site`.

---

## 🧑‍🏫 2. Cómo se usa el sistema

**Alumnos**
- Crean su cuenta desde la página (botón "Reservá tu clase" → "Crear mi cuenta").
- En **Clases** eligen un horario libre. Pueden cancelar hasta 24 h antes.
- En **Ejercicios** ven lo que les asignaste y lo marcan como hecho.
- En **Mensajes** te escriben. Los mensajes nuevos se revisan solos cada 15 segundos.

**Vos (panel)**
- **Agenda:** cargás horarios libres (un día suelto o repetido varias semanas). Ves quién reservó.
- **Alumnos:** tocás un alumno para asignarle programa, darle ejercicios (con fecha opcional),
  dejarle devoluciones, responderle mensajes o generarle una contraseña nueva si se la olvidó.
- **Ejercicios:** los creás una vez. Si les ponés un programa, se asignan solos a todos los alumnos
  de ese programa (también a los que se sumen después).
- **Consultas:** mensajes del formulario de la página, de personas que todavía no tienen cuenta.

**Las clases por videollamada**
- Cada clase tiene su propia sala privada de **Jitsi Meet** (gratis).
- El botón **"Entrar a la clase"** aparece 15 minutos antes, tanto para vos como para el alumno.
- **Entrá vos primero:** Jitsi le pide a quien abre la sala que inicie sesión (con Google, por ejemplo).
  Una vez adentro, el alumno entra sin cuenta.
- En la compu se abre en el navegador; en el celular conviene tener la app gratuita **Jitsi Meet**.

---

## 🌐 3. Conectar tu dominio propio (.com.ar)

1. **Registrá el dominio** en **nic.ar** (necesitás CUIT/CUIL y clave fiscal de ARCA).
2. **En Vercel:** proyecto → **Settings → Domains** → escribí `tudominio.com.ar` → **Add**
   (aceptá también `www.tudominio.com.ar`).
3. **En nic.ar** → **Mis dominios** → tu dominio → **Delegar** → cargá estos servidores:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
4. Esperá (de minutos a 24/48 h) hasta que Vercel diga **Valid Configuration** ✅.
5. Cambiá `url` en `contenido/sitio.ts` por `https://tudominio.com.ar`.

## 📱 4. Instalarla como app

- **Android (Chrome):** abajo de todo en la página tocá **Instalar app** (o menú ⋮ → **Instalar aplicación**).
- **iPhone (Safari):** **Compartir** (cuadrado con flecha) → **Agregar a inicio**.
- **Compu (Chrome o Edge):** ícono de instalar en la barra de direcciones → **Instalar**.

La app instalada abre directo en el espacio del alumno (o en tu panel si sos vos).

---

## 💻 Para quien programe: correrla en una compu

Necesita [Node.js](https://nodejs.org) (LTS) y una base Postgres.

```bash
cp .env.example .env.local   # y completá DATABASE_URL y ADMIN_EMAIL
npm install
npm run dev                  # http://localhost:3000
```

Archivos principales: `lib/db.ts` (tablas), `lib/sesion.ts` (cuentas), `lib/datos.ts` (lecturas),
`app/acciones.ts` (todo lo que modifica datos), `app/mi-espacio/` (alumno), `app/panel/` (coach).

## ✅ Antes de compartir el link

- [ ] Cambiar los textos `✏️ REVISAR` de `contenido/sitio.ts` (precios, formación, historia)
- [ ] Subir tu foto
- [ ] Crear la base de datos y tu cuenta de coach
- [ ] Cargar horarios en la Agenda y algunos ejercicios
- [ ] Hacer una prueba con una cuenta de alumno (por ejemplo, con otro mail tuyo)
