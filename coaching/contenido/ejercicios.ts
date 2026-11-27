/* =====================================================================
   📝 EJERCICIOS INICIALES
   =====================================================================
   Estos ejercicios se cargan solos en el sistema la PRIMERA vez que se
   usa la base de datos. Después se administran desde el panel
   (Panel → Ejercicios): ahí podés editarlos, borrarlos o crear nuevos.

   - "programa": tiene que ser igual al nombre de un programa de sitio.ts.
     Esos ejercicios les llegan solos a los alumnos de ese programa,
     en el orden en que están acá.
   - programa: null → queda en tu biblioteca para asignarlo a mano.

   Todos están marcados ✏️ REVISAR: adaptalos a tu forma de trabajar.
   ===================================================================== */

type EjercicioInicial = { titulo: string; descripcion: string; programa: string | null };

export const ejerciciosIniciales: EjercicioInicial[] = [
  // ---------------------------------------------------------------
  // CLASE INDIVIDUAL
  // ---------------------------------------------------------------
  {
    programa: "Clase individual",
    titulo: "Antes de la clase: ¿qué querés destrabar?",
    descripcion:
      "Escribí en pocas líneas:\n1. ¿Qué situación o decisión querés trabajar?\n2. ¿Qué intentaste hasta ahora?\n3. ¿Cómo te darías cuenta de que la clase te sirvió?\n\nTraelo anotado a la clase.",
  },
  {
    programa: "Clase individual",
    titulo: "Después de la clase: tu próximo paso",
    descripcion:
      "Anotá la acción concreta que definimos en la clase, cuándo la vas a hacer y qué podría frenarte.\nCuando la hagas, marcá este ejercicio como hecho.",
  },

  // ---------------------------------------------------------------
  // PROGRAMA 4 SEMANAS (uno por semana)
  // ---------------------------------------------------------------
  {
    programa: "Programa 4 semanas",
    titulo: "Semana 1 · ¿Dónde estoy hoy?",
    descripcion:
      "Puntuá del 1 al 10 cómo te sentís hoy en estas áreas: trabajo o estudio, salud, vínculos, economía, tiempo libre y crecimiento personal.\n\nDespués respondé:\n- ¿Qué área te gustaría mejorar primero?\n- ¿Qué cambiaría en tu día a día si esa área subiera 2 puntos?",
  },
  {
    programa: "Programa 4 semanas",
    titulo: "Semana 2 · Definí tu meta",
    descripcion:
      "Escribí una meta para estas semanas que cumpla con esto:\n- Es concreta: se entiende qué vas a lograr.\n- Se puede medir: sabés cuándo la cumpliste.\n- Depende de vos.\n- Tiene fecha.\n\nEjemplo: «Antes del 30, enviar mi CV a 5 empresas que me interesen».",
  },
  {
    programa: "Programa 4 semanas",
    titulo: "Semana 3 · Tu plan de acción",
    descripcion:
      "Dividí tu meta en pasos chicos, que puedas hacer en menos de una hora cada uno.\nOrdenalos y poné una fecha al lado de cada paso.\n\nElegí el primero y hacelo en las próximas 48 horas.",
  },
  {
    programa: "Programa 4 semanas",
    titulo: "Semana 4 · Balance y próximos pasos",
    descripcion:
      "Revisá estas semanas:\n- ¿Qué lograste?\n- ¿Qué te costó más y qué aprendiste de eso?\n- ¿Qué hábito querés sostener de acá en adelante?\n\nEscribí 3 próximos pasos para el mes que viene.",
  },

  // ---------------------------------------------------------------
  // PROGRAMA 3 MESES
  // ---------------------------------------------------------------
  {
    programa: "Programa 3 meses",
    titulo: "Mes 1 · Rueda de la vida",
    descripcion:
      "Puntuá del 1 al 10 tu satisfacción en: trabajo o estudio, salud, vínculos, economía, tiempo libre y crecimiento personal.\n\nMarcá las 2 áreas que más te importa mejorar en estos 3 meses y escribí por qué.",
  },
  {
    programa: "Programa 3 meses",
    titulo: "Mes 1 · Tu visión a 3 meses",
    descripcion:
      "Imaginá que pasaron 3 meses y todo salió bien.\nEscribí en presente cómo es un día tuyo: qué hacés, cómo te sentís, qué cambió.\n\nDe ese texto, subrayá las 3 cosas más importantes: van a ser tus metas.",
  },
  {
    programa: "Programa 3 meses",
    titulo: "Mes 1 · Metas y primeros pasos",
    descripcion:
      "Para cada una de tus 3 metas escribí:\n- Qué vas a lograr y para cuándo.\n- Cómo vas a medir el avance.\n- El primer paso concreto, con fecha.",
  },
  {
    programa: "Programa 3 meses",
    titulo: "Mes 2 · Hábitos que te acercan",
    descripcion:
      "Elegí 1 hábito chico que te acerque a tu meta principal (por ejemplo, 20 minutos por día de algo concreto).\nDurante 14 días, anotá cada noche si lo hiciste o no y cómo te sentiste.\n\nAl final: ¿qué te ayudó a sostenerlo y qué te frenó?",
  },
  {
    programa: "Programa 3 meses",
    titulo: "Mes 2 · Obstáculos y creencias",
    descripcion:
      "Escribí las frases que te decís cuando algo te cuesta (por ejemplo: «no soy bueno para esto», «no tengo tiempo»).\nPara cada una respondé:\n- ¿Es 100% cierta?\n- ¿Qué evidencia tenés en contra?\n- ¿Qué frase más útil podrías decirte en su lugar?",
  },
  {
    programa: "Programa 3 meses",
    titulo: "Mes 3 · Balance del proceso",
    descripcion:
      "Volvé a puntuar la rueda de la vida del mes 1 y compará.\n- ¿Qué cambió?\n- ¿De qué logro te sentís más orgulloso u orgullosa?\n- ¿Qué aprendiste sobre tu forma de avanzar?",
  },
  {
    programa: "Programa 3 meses",
    titulo: "Mes 3 · Plan para seguir solo/a",
    descripcion:
      "Armá tu plan para los próximos 3 meses:\n- Qué metas querés sostener o empezar.\n- Qué hábitos vas a mantener.\n- Cómo te vas a dar cuenta si te estás desviando y qué vas a hacer en ese caso.",
  },

  // ---------------------------------------------------------------
  // BIBLIOTECA (sin programa: los asignás a mano desde la ficha del alumno)
  // ---------------------------------------------------------------
  {
    programa: null,
    titulo: "Registro de logros de la semana",
    descripcion:
      "Cada noche de esta semana, anotá 1 cosa que hiciste bien o que te acercó a tu meta, por chica que sea.\nEl domingo, leé la lista completa.",
  },
  {
    programa: null,
    titulo: "Prioridades: lo importante primero",
    descripcion:
      "Hacé una lista de todo lo que tenés pendiente.\nSeparala en 4 grupos: urgente e importante, importante pero no urgente, urgente pero no importante, ni urgente ni importante.\n\nPlanificá tu semana empezando por el segundo grupo.",
  },
  {
    programa: null,
    titulo: "Carta a tu yo del futuro",
    descripcion:
      "Escribite una carta para leer dentro de 6 meses: qué esperás haber logrado, qué querés recordar de este momento y qué consejo te darías.",
  },
  {
    programa: null,
    titulo: "Pausa consciente de 5 minutos",
    descripcion:
      "Durante 5 días, tomate 5 minutos en un momento tranquilo: respirá despacio y anotá cómo te sentís y qué necesitás hoy.\nAl final, mirá si se repite algo.",
  },
];
