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
  marca: "Sereno Coaching", // ✏️ REVISAR: el nombre de tu marca
  nombre: "Laura Gómez", // ✏️ REVISAR: tu nombre
  profesion: "Coach ontológica", // ✏️ REVISAR

  // Dirección final de tu web (cuando tengas dominio, cambiala acá).
  // Se usa para la vista previa al compartir en WhatsApp/Instagram.
  url: "https://sereno-coaching.vercel.app", // ✏️ REVISAR

  // ---------------------------------------------------------------
  // SEO: lo que aparece en Google y al compartir el link
  // ---------------------------------------------------------------
  seo: {
    titulo: "Sereno Coaching | Coaching online para tu cambio laboral", // ✏️ REVISAR
    descripcion:
      "Sesiones de coaching por videollamada para personas que quieren cambiar de trabajo con claridad y sin ansiedad. Atiendo en Argentina y toda Latinoamérica.", // ✏️ REVISAR
  },

  // ---------------------------------------------------------------
  // CONTACTO Y REDES
  // ---------------------------------------------------------------
  contacto: {
    // Tu WhatsApp: SOLO números, con código de país, sin +, espacios ni guiones.
    // Ejemplo Argentina: 54 + 9 + código de área sin 0 + número sin 15
    whatsapp: "5491100000000", // ✏️ REVISAR: tu número
    mensajeWhatsapp: "¡Hola! Vi tu página y quiero saber más sobre las sesiones.", // ✏️ REVISAR
    email: "hola@tumarca.com", // ✏️ REVISAR (dejalo "" si no querés mostrarlo)
    redes: [
      // ✏️ REVISAR: borrá las que no uses o agregá otras con el mismo formato
      { nombre: "Instagram", url: "https://instagram.com/tuusuario" },
      { nombre: "LinkedIn", url: "https://linkedin.com/in/tuusuario" },
    ],
  },

  // ---------------------------------------------------------------
  // RESERVAS (Cal.com o Calendly)
  // Cuando crees tu cuenta, pegá acá tu link. Ejemplos:
  //   "https://cal.com/tuusuario/primera-sesion"
  //   "https://calendly.com/tuusuario/30min"
  // Mientras esté vacío "", el botón "Reservá" lleva a WhatsApp.
  // ---------------------------------------------------------------
  linkReservas: "",

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
    etiqueta: "Coaching online · Argentina y Latinoamérica", // ✏️ REVISAR
    titulo: "Animate a cambiar de trabajo, con un plan y sin ansiedad", // ✏️ REVISAR
    frase:
      "Te acompaño a descubrir qué querés hacer, a ordenar tus próximos pasos y a darlos con confianza. Todo por videollamada, desde donde estés.", // ✏️ REVISAR
    boton: "Reservá tu sesión",
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
    titulo: "Hola, soy Laura", // ✏️ REVISAR
    historia: [
      // ✏️ REVISAR: contá tu historia en 2 o 3 párrafos cortos
      "Durante diez años trabajé en una empresa donde me iba bien, pero algo no cerraba. Me levantaba cansada y sentía que estaba viviendo la vida que otros esperaban de mí.",
      "Hacer mi propio proceso de coaching me ayudó a entender qué quería y a animarme a cambiar. Hoy acompaño a otras personas a hacer ese mismo camino, a su ritmo y con los pies en la tierra.",
    ],
    formacion: [
      // ✏️ REVISAR: tus títulos y certificaciones
      "Coach ontológica profesional",
      "Licenciada en Recursos Humanos",
      "Formación en orientación vocacional para adultos",
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
    notaPrecios: "Precios en pesos argentinos. Si estás fuera de Argentina, consultame el valor en dólares.",
    lista: [
      {
        nombre: "Sesión individual", // ✏️ REVISAR
        descripcion:
          "Ideal para destrabar una decisión puntual o conocer cómo trabajo. Salís con claridad y un próximo paso concreto.", // ✏️ REVISAR
        duracion: "1 encuentro de 60 minutos", // ✏️ REVISAR
        precio: "$35.000", // ✏️ REVISAR
        incluye: ["Videollamada de 60 min", "Resumen con tus próximos pasos"],
        destacado: false,
        linkPago: "", // 💳 link de pago de Mercado Pago (para más adelante)
      },
      {
        nombre: "Programa 4 semanas", // ✏️ REVISAR
        descripcion:
          "Para ordenar tus ideas, definir qué querés y armar un plan de acción realista para tu cambio laboral.", // ✏️ REVISAR
        duracion: "4 sesiones semanales de 60 minutos", // ✏️ REVISAR
        precio: "$120.000", // ✏️ REVISAR
        incluye: ["4 videollamadas", "Ejercicios entre sesiones", "Consultas por WhatsApp"],
        destacado: true,
        linkPago: "", // 💳 link de pago de Mercado Pago (para más adelante)
      },
      {
        nombre: "Programa 3 meses", // ✏️ REVISAR
        descripcion:
          "Un acompañamiento profundo para transitar el cambio de principio a fin: desde la búsqueda hasta tus primeros meses en el nuevo camino.", // ✏️ REVISAR
        duracion: "12 sesiones semanales de 60 minutos", // ✏️ REVISAR
        precio: "$330.000", // ✏️ REVISAR
        incluye: ["12 videollamadas", "Plan personalizado", "Seguimiento por WhatsApp"],
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
      { titulo: "Primera sesión", texto: "Nos conocemos por videollamada, me contás dónde estás y adónde querés llegar." },
      { titulo: "Tu plan", texto: "Definimos juntos objetivos claros y los pasos para alcanzarlos." },
      { titulo: "Seguimiento", texto: "Te acompaño sesión a sesión para que sostengas el cambio en el tiempo." },
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
        pregunta: "¿Cómo son las sesiones online?",
        respuesta:
          "Son por videollamada (Google Meet o Zoom) y duran 60 minutos. Solo necesitás conexión a internet y un lugar tranquilo donde puedas hablar con comodidad.",
      },
      {
        pregunta: "¿Puedo hacerlo si vivo fuera de Argentina?",
        respuesta:
          "Sí. Trabajo con personas de toda Latinoamérica y España. Coordinamos el horario según tu zona horaria.",
      },
      {
        pregunta: "¿Cuántas sesiones voy a necesitar?",
        respuesta:
          "Depende de tu objetivo. Algunas personas resuelven algo puntual en una sesión; para un cambio laboral completo, lo habitual es un proceso de 1 a 3 meses. Lo charlamos en el primer encuentro.",
      },
      {
        pregunta: "¿Cómo se paga?",
        respuesta:
          "Por ahora, por transferencia bancaria o Mercado Pago dentro de Argentina, y por PayPal o Wise desde otros países. Te paso los datos al confirmar la reserva.",
      },
      {
        pregunta: "¿Puedo reprogramar una sesión?",
        respuesta:
          "Sí, avisándome con al menos 24 horas de anticipación la pasamos a otro día sin costo.",
      },
    ],
  },

  // ---------------------------------------------------------------
  // 7. CONTACTO
  // ---------------------------------------------------------------
  contactoSeccion: {
    titulo: "¿Charlamos?",
    bajada:
      "Escribime por WhatsApp o dejame tu mensaje y te respondo dentro de las 24 horas hábiles.", // ✏️ REVISAR
    botonWhatsapp: "Escribime por WhatsApp",
  },

  // ---------------------------------------------------------------
  // RESERVAS (la sección con el calendario)
  // El link del calendario se carga más arriba, en "linkReservas".
  // ---------------------------------------------------------------
  reservas: {
    titulo: "Reservá tu sesión",
    bajada: "Elegí el día y el horario que te queden cómodos. Vas a recibir la confirmación y el link de la videollamada por mail.", // ✏️ REVISAR
    // Texto que se muestra mientras no hayas cargado el link del calendario:
    sinCalendario: "Muy pronto vas a poder reservar acá mismo. Mientras tanto, escribime y coordinamos un horario.",
  },

  // ---------------------------------------------------------------
  // PIE DE PÁGINA
  // ---------------------------------------------------------------
  pie: {
    frase: "Coaching online para animarte a cambiar.", // ✏️ REVISAR
  },
};
