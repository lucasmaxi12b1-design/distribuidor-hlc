/* =====================================================================
   📝 CONTENIDO DE LA PÁGINA — ESTE ES EL ÚNICO ARCHIVO QUE TENÉS QUE EDITAR
   =====================================================================

   Cómo editar sin romper nada:
   - Cambiá solo lo que está entre comillas "así".
   - No borres las comas del final de cada línea ni las llaves { }.
   - Si querés un salto de párrafo dentro de un texto, separá los
     párrafos en una lista: ["Párrafo 1", "Párrafo 2"].
   - Los textos marcados con ✏️ REVISAR son de ejemplo: cambialos por
     los tuyos. (El ✏️ es solo un comentario, no se ve en la página).

   Cuando guardás este archivo, la página se actualiza sola.
   ===================================================================== */

export const sitio = {
  // ---------------------------------------------------------------
  // DATOS GENERALES
  // ---------------------------------------------------------------
  marca: "Lisandro Coaching", // ✏️ REVISAR: el nombre de tu marca
  nombre: "Lisandro", // ✏️ REVISAR: podés agregar tu apellido
  profesion: "Coach", // ✏️ REVISAR

  // Dirección final de tu web (cuando tengas dominio, cambiala acá).
  // Se usa para la vista previa al compartir en WhatsApp/Instagram.
  url: "https://lisandro-coaching.vercel.app", // ✏️ REVISAR cuando publiques

  // ---------------------------------------------------------------
  // SEO: lo que aparece en Google y al compartir el link
  // ---------------------------------------------------------------
  seo: {
    titulo: "Lisandro Coaching | Clases personalizadas para lograr tus metas", // ✏️ REVISAR
    descripcion:
      "Clases de coaching personalizadas por videollamada para que logres tus metas y objetivos. Atiendo en Argentina y en todos los países de habla hispana.", // ✏️ REVISAR
  },

  // ---------------------------------------------------------------
  // CONTACTO Y REDES
  // ---------------------------------------------------------------
  contacto: {
    email: "", // ✏️ REVISAR: si querés mostrar tu mail, escribilo entre las comillas
    redes: [
      // ✏️ REVISAR: agregá tus redes copiando este formato (sin las // del principio):
      // { nombre: "Instagram", url: "https://instagram.com/tuusuario" },
      // { nombre: "LinkedIn", url: "https://linkedin.com/in/tuusuario" },
    ] as { nombre: string; url: string }[],
  },

  // ---------------------------------------------------------------
  // MENÚ
  // ---------------------------------------------------------------
  menu: [
    { texto: "Sobre mí", destino: "#sobre-mi" },
    { texto: "Servicios", destino: "#servicios" },
    { texto: "Cómo funciona", destino: "#como-funciona" },
    { texto: "Preguntas", destino: "#preguntas" },
    { texto: "Contacto", destino: "#contacto" },
  ],

  // ---------------------------------------------------------------
  // 1. INICIO
  // ---------------------------------------------------------------
  inicio: {
    etiqueta: "Clases personalizadas online · Argentina y Latinoamérica", // ✏️ REVISAR
    titulo: "Lográ tus metas con un acompañamiento a tu medida", // ✏️ REVISAR
    frase:
      "En clases personalizadas por videollamada te ayudo a definir qué querés lograr, armar un plan concreto y sostenerlo hasta cumplirlo. Desde donde estés.", // ✏️ REVISAR
    boton: "Reservá tu clase",
    botonSecundario: "Ver programas",
  },

  // ---------------------------------------------------------------
  // 2. SOBRE MÍ
  // ---------------------------------------------------------------
  sobreMi: {
    // 📷 TU FOTO: copiá tu foto a la carpeta  coaching/public/
    // con el nombre  foto-perfil.jpg  y acá escribí "/foto-perfil.jpg".
    // Mientras esté vacío "", se muestra un recuadro de reemplazo.
    // Ideal: foto vertical, buena luz, mínimo 800 px de ancho.
    foto: "",
    titulo: "Hola, soy Lisandro",
    historia: [
      // ✏️ REVISAR: contá tu historia en 2 o 3 párrafos cortos
      "Creo que cualquier meta se vuelve alcanzable cuando tenés claro hacia dónde vas y alguien que te acompañe en el camino.",
      "Por eso trabajo con clases personalizadas: cada persona llega con objetivos, tiempos y desafíos distintos, y el proceso se adapta a vos, no al revés.",
    ],
    formacion: [
      // ✏️ REVISAR: tus títulos y certificaciones
      "Completá acá tu formación en coaching",
      "Completá acá otros títulos o certificaciones",
    ],
  },

  // ---------------------------------------------------------------
  // 3. SERVICIOS
  // Para agregar un programa, copiá un bloque { ... } completo y cambiá los textos.
  // "destacado: true" lo resalta como el más elegido (poné solo uno).
  // ---------------------------------------------------------------
  servicios: {
    titulo: "Programas",
    bajada: "Elegí el formato que mejor se adapte a tu momento.",
    // ✏️ REVISAR: moneda que se muestra al lado del precio
    notaPrecios: "Precios en pesos argentinos.",
    lista: [
      {
        nombre: "Clase individual", // ✏️ REVISAR
        descripcion:
          "Ideal para destrabar un tema puntual o conocer cómo trabajo. Salís con claridad y un próximo paso concreto.", // ✏️ REVISAR
        duracion: "1 clase de 60 minutos", // ✏️ REVISAR
        precio: "$35.000", // ✏️ REVISAR: precio de ejemplo
        incluye: ["Clase de 60 min por videollamada", "Resumen con tus próximos pasos"],
        destacado: false,
        linkPago: "", // 💳 link de pago de Mercado Pago (para más adelante)
      },
      {
        nombre: "Programa 4 semanas", // ✏️ REVISAR
        descripcion:
          "Para definir tu meta, ordenar prioridades y armar un plan de acción realista que puedas sostener.", // ✏️ REVISAR
        duracion: "4 clases semanales de 60 minutos", // ✏️ REVISAR
        precio: "$120.000", // ✏️ REVISAR: precio de ejemplo
        incluye: ["4 clases por videollamada", "Ejercicios entre clases", "Consultas por WhatsApp"],
        destacado: true,
        linkPago: "", // 💳 link de pago de Mercado Pago (para más adelante)
      },
      {
        nombre: "Programa 3 meses", // ✏️ REVISAR
        descripcion:
          "Un acompañamiento profundo para trabajar tus objetivos de principio a fin, con seguimiento constante hasta que los cumplas.", // ✏️ REVISAR
        duracion: "12 clases semanales de 60 minutos", // ✏️ REVISAR
        precio: "$330.000", // ✏️ REVISAR: precio de ejemplo
        incluye: ["12 clases por videollamada", "Plan personalizado", "Seguimiento por WhatsApp"],
        destacado: false,
        linkPago: "", // 💳 link de pago de Mercado Pago (para más adelante)
      },
    ],
    // 💳 PAGOS ONLINE (Mercado Pago) — por ahora apagado.
    // Para activarlo más adelante:
    //   1. En Mercado Pago creá un "Link de pago" para cada programa.
    //   2. Pegá cada link en "linkPago" del programa que corresponde.
    //   3. Cambiá false por true acá abajo.
    // En cada tarjeta va a aparecer el botón "Pagar con Mercado Pago".
    pagosOnline: false,
  },

  // ---------------------------------------------------------------
  // 4. CÓMO FUNCIONA
  // ---------------------------------------------------------------
  comoFunciona: {
    titulo: "Cómo funciona",
    pasos: [
      // ✏️ REVISAR
      { titulo: "Reservás", texto: "Elegís el día y horario que te quede cómodo desde el calendario online." },
      { titulo: "Primera clase", texto: "Nos conocemos por videollamada y me contás qué querés lograr." },
      { titulo: "Tu plan", texto: "Definimos juntos objetivos claros y los pasos para alcanzarlos." },
      { titulo: "Seguimiento", texto: "Te acompaño clase a clase hasta que alcances tu meta." },
    ],
  },

  // ---------------------------------------------------------------
  // 5. TESTIMONIOS
  // ⚠️ Cargá solo testimonios REALES y con permiso de tus clientes.
  // Mientras la lista esté vacía, esta sección NO aparece en la página.
  // Formato para agregar uno (copiá y pegá dentro de los corchetes):
  //   { texto: "Lo que te dijo tu cliente", nombre: "Nombre", detalle: "Programa 4 semanas" },
  // ---------------------------------------------------------------
  testimonios: {
    titulo: "Lo que cuentan quienes ya hicieron el proceso",
    lista: [] as { texto: string; nombre: string; detalle?: string }[],
  },

  // ---------------------------------------------------------------
  // 6. PREGUNTAS FRECUENTES
  // ---------------------------------------------------------------
  preguntas: {
    titulo: "Preguntas frecuentes",
    lista: [
      // ✏️ REVISAR todas las respuestas
      {
        pregunta: "¿Qué es el coaching y en qué se diferencia de la terapia?",
        respuesta:
          "El coaching se enfoca en tu presente y en lo que querés lograr: te ayuda a ganar claridad, tomar decisiones y pasar a la acción. No reemplaza a la terapia psicológica; si en algún momento creo que te puede servir más un acompañamiento terapéutico, te lo voy a decir.",
      },
      {
        pregunta: "¿Cómo son las clases online?",
        respuesta:
          "Son por videollamada y duran 60 minutos. Entrás desde tu espacio con un botón, sin instalar nada en la compu (en el celular puede pedirte la app gratuita Jitsi Meet). Solo necesitás internet y un lugar tranquilo.",
      },
      {
        pregunta: "¿Puedo hacerlo si vivo fuera de Argentina?",
        respuesta:
          "Sí. Trabajo por videollamada con personas de todos los países de habla hispana. Coordinamos el horario según tu zona horaria.",
      },
      {
        pregunta: "¿Cuántas clases voy a necesitar?",
        respuesta:
          "Depende de tu objetivo. Algo puntual se puede resolver en una clase; para una meta más grande, lo habitual es un proceso de 1 a 3 meses. Lo charlamos en la primera clase.",
      },
      {
        pregunta: "¿Cómo se paga?",
        respuesta:
          "Por transferencia bancaria o Mercado Pago. Te paso los datos al confirmar la reserva.",
      },
      {
        pregunta: "¿Puedo reprogramar una clase?",
        respuesta:
          "Sí. Desde tu espacio podés cancelar hasta 24 horas antes y elegir otro horario, sin costo.",
      },
    ],
  },

  // ---------------------------------------------------------------
  // 7. CONTACTO
  // ---------------------------------------------------------------
  contactoSeccion: {
    titulo: "¿Charlamos?",
    bajada:
      "¿Tenés dudas antes de empezar? Dejame tu mensaje y te respondo por mail dentro de las 24 horas hábiles.", // ✏️ REVISAR
  },

  // ---------------------------------------------------------------
  // RESERVAS (sección que invita a crear la cuenta)
  // Los horarios libres se cargan desde el panel → Agenda.
  // ---------------------------------------------------------------
  reservas: {
    titulo: "Reservá tu clase",
    bajada: "Creá tu cuenta y elegí el día y el horario que te queden cómodos. Las clases, los ejercicios y los mensajes quedan todos en tu espacio.", // ✏️ REVISAR
    // Texto que se muestra mientras no hayas cargado el link del calendario:
    // ✏️ REVISAR
    pasos: ["Creás tu cuenta gratis", "Elegís un horario libre", "Entrás a la clase desde tu espacio"],
  },

  // ---------------------------------------------------------------
  // PIE DE PÁGINA
  // ---------------------------------------------------------------
  pie: {
    frase: "Clases personalizadas para lograr tus metas.", // ✏️ REVISAR
  },
};
