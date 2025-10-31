// ============================================
// ARCHIVO: js/exercisesData.js
// ============================================

// Base de datos de ejercicios pre-cargados
export const exercisesDatabase = [
  // ============================================
  // PECHO
  // ============================================
  {
    id: "press-banca-plano",
    name: "Press de Banca Plano",
    category: "pecho",
    level: "intermedio",
    description:
      "Ejercicio fundamental para desarrollar fuerza y masa en el pecho.",
    instructions: [
      "Acuéstate en el banco con los pies firmes en el suelo",
      "Agarra la barra con las manos un poco más anchas que los hombros",
      "Baja la barra controladamente hasta tocar el pecho",
      "Empuja la barra hacia arriba hasta extender los brazos",
      "Mantén los omóplatos retraídos durante todo el movimiento",
    ],
    tips: [
      "No rebotes la barra en el pecho",
      "Mantén los codos a 45° del cuerpo",
      "Exhala al empujar, inhala al bajar",
    ],
    variants: [
      {
        level: "principiante",
        name: "Press con mancuernas",
        description: "Permite mayor rango de movimiento y control",
      },
      {
        level: "intermedio",
        name: "Press inclinado",
        description: "Enfoca el trabajo en pecho superior",
      },
      {
        level: "avanzado",
        name: "Press declinado",
        description: "Mayor activación del pecho inferior",
      },
    ],
  },
  {
    id: "press-inclinado",
    name: "Press Inclinado con Barra",
    category: "pecho",
    level: "intermedio",
    description: "Desarrolla el pecho superior y los hombros frontales.",
    instructions: [
      "Ajusta el banco a 30-45 grados de inclinación",
      "Agarra la barra con las manos más anchas que los hombros",
      "Baja la barra hacia la parte superior del pecho",
      "Empuja hacia arriba hasta extender los brazos",
      "Controla el peso en todo momento",
    ],
    tips: [
      "No uses inclinaciones mayores a 45°",
      "Mantén la zona lumbar apoyada",
      "Usa un peso menor que en press plano",
    ],
    variants: [
      {
        level: "principiante",
        name: "Press inclinado con mancuernas",
        description: "Mayor estabilidad",
      },
      {
        level: "intermedio",
        name: "Press inclinado en Smith",
        description: "Movimiento guiado",
      },
      {
        level: "avanzado",
        name: "Press inclinado pausa",
        description: "Con pausa en el pecho",
      },
    ],
  },
  {
    id: "aperturas-mancuernas",
    name: "Aperturas con Mancuernas",
    category: "pecho",
    level: "principiante",
    description: "Aislamiento del pecho con énfasis en el estiramiento.",
    instructions: [
      "Acuéstate en banco plano con mancuernas sobre el pecho",
      "Baja los brazos en arco con codos ligeramente flexionados",
      "Desciende hasta sentir estiramiento en el pecho",
      "Regresa a la posición inicial contrayendo el pecho",
      "Mantén los codos en ángulo constante",
    ],
    tips: [
      "No bajes demasiado para evitar lesiones",
      "Usa peso moderado",
      "Enfócate en la contracción del pecho",
    ],
    variants: [
      {
        level: "principiante",
        name: "Aperturas en máquina",
        description: "Movimiento guiado y seguro",
      },
      {
        level: "intermedio",
        name: "Aperturas inclinadas",
        description: "Trabaja pecho superior",
      },
      {
        level: "avanzado",
        name: "Cable crossovers",
        description: "Tensión constante",
      },
    ],
  },
  {
    id: "flexiones",
    name: "Flexiones de Pecho",
    category: "pecho",
    level: "principiante",
    description: "Ejercicio de peso corporal clásico para pecho y core.",
    instructions: [
      "Colócate en posición de plancha con manos al ancho de hombros",
      "Mantén el cuerpo en línea recta",
      "Baja el pecho hacia el suelo doblando los codos",
      "Empuja hacia arriba hasta extender los brazos",
      "Mantén el core contraído todo el tiempo",
    ],
    tips: [
      "No dejes caer las caderas",
      "Respira correctamente",
      "Mantén la mirada al frente",
    ],
    variants: [
      {
        level: "principiante",
        name: "Flexiones de rodillas",
        description: "Menos intensidad",
      },
      {
        level: "intermedio",
        name: "Flexiones con palmada",
        description: "Trabajo explosivo",
      },
      {
        level: "avanzado",
        name: "Flexiones arquero",
        description: "Mayor dificultad unilateral",
      },
    ],
  },
  {
    id: "fondos-paralelas",
    name: "Fondos en Paralelas",
    category: "pecho",
    level: "avanzado",
    description: "Ejercicio compuesto para pecho inferior y tríceps.",
    instructions: [
      "Agarra las barras paralelas y elévate",
      "Inclina el torso hacia adelante (20-30°)",
      "Baja controladamente doblando los codos",
      "Desciende hasta que los hombros estén al nivel de los codos",
      "Empuja hacia arriba hasta extender los brazos",
    ],
    tips: [
      "Mayor inclinación = más pecho",
      "No bajes demasiado si hay dolor de hombro",
      "Usa lastre cuando domines el movimiento",
    ],
    variants: [
      {
        level: "principiante",
        name: "Fondos asistidos",
        description: "Con banda elástica",
      },
      {
        level: "intermedio",
        name: "Fondos peso corporal",
        description: "Sin asistencia",
      },
      {
        level: "avanzado",
        name: "Fondos con lastre",
        description: "Agregar peso extra",
      },
    ],
  },

  // ============================================
  // ESPALDA
  // ============================================
  {
    id: "dominadas",
    name: "Dominadas",
    category: "espalda",
    level: "avanzado",
    description:
      "El rey de los ejercicios de espalda para desarrollo de dorsales.",
    instructions: [
      "Agarra la barra con las manos más anchas que los hombros",
      "Cuelga con los brazos completamente extendidos",
      "Tira hacia arriba hasta que la barbilla pase la barra",
      "Baja controladamente a la posición inicial",
      "Evita balancearte",
    ],
    tips: [
      "Inicia el movimiento con los dorsales, no los brazos",
      "Mantén el pecho hacia afuera",
      "Usa bandas elásticas si eres principiante",
    ],
    variants: [
      {
        level: "principiante",
        name: "Dominadas asistidas",
        description: "Con máquina o banda",
      },
      {
        level: "intermedio",
        name: "Dominadas neutras",
        description: "Agarre paralelo",
      },
      {
        level: "avanzado",
        name: "Dominadas con lastre",
        description: "Peso adicional",
      },
    ],
  },
  {
    id: "remo-barra",
    name: "Remo con Barra",
    category: "espalda",
    level: "intermedio",
    description: "Ejercicio compuesto para grosor de espalda.",
    instructions: [
      "Inclínate hacia adelante con espalda recta (45°)",
      "Agarra la barra con manos al ancho de hombros",
      "Tira de la barra hacia el abdomen",
      "Contrae los omóplatos al final del movimiento",
      "Baja la barra controladamente",
    ],
    tips: [
      "No redondees la espalda",
      "Mantén las rodillas ligeramente flexionadas",
      "El movimiento debe ser fluido",
    ],
    variants: [
      {
        level: "principiante",
        name: "Remo en máquina",
        description: "Movimiento guiado",
      },
      {
        level: "intermedio",
        name: "Remo con mancuerna",
        description: "Trabajo unilateral",
      },
      {
        level: "avanzado",
        name: "Remo Pendlay",
        description: "Desde el suelo",
      },
    ],
  },
  {
    id: "peso-muerto",
    name: "Peso Muerto",
    category: "espalda",
    level: "avanzado",
    description: "Ejercicio rey para toda la cadena posterior.",
    instructions: [
      "Párate con pies al ancho de caderas frente a la barra",
      "Agarra la barra con las manos al ancho de hombros",
      "Mantén la espalda recta y el pecho hacia afuera",
      "Empuja con las piernas mientras levantas la barra",
      "Extiende las caderas al llegar arriba",
      "Baja controladamente manteniendo la espalda recta",
    ],
    tips: [
      "La barra debe rozar las piernas",
      "No redondees la espalda nunca",
      "Usa cinturón en cargas pesadas",
    ],
    variants: [
      {
        level: "principiante",
        name: "Peso muerto rumano",
        description: "Menos rango de movimiento",
      },
      {
        level: "intermedio",
        name: "Peso muerto sumo",
        description: "Stance amplio",
      },
      {
        level: "avanzado",
        name: "Peso muerto deficitario",
        description: "Sobre plataforma",
      },
    ],
  },
  {
    id: "jalones-polea",
    name: "Jalones en Polea",
    category: "espalda",
    level: "principiante",
    description: "Alternativa a las dominadas para trabajar dorsales.",
    instructions: [
      "Siéntate en la máquina con muslos asegurados",
      "Agarra la barra con manos anchas",
      "Tira de la barra hacia el pecho",
      "Contrae los omóplatos al bajar",
      "Regresa controladamente a la posición inicial",
    ],
    tips: [
      "No uses impulso",
      "Mantén el torso ligeramente inclinado",
      "Concéntrate en usar la espalda, no los brazos",
    ],
    variants: [
      { level: "principiante", name: "Jalón frontal", description: "Básico" },
      {
        level: "intermedio",
        name: "Jalón agarre estrecho",
        description: "Más activación central",
      },
      { level: "avanzado", name: "Jalón unilateral", description: "Un brazo" },
    ],
  },
  {
    id: "remo-mancuerna",
    name: "Remo con Mancuerna a Una Mano",
    category: "espalda",
    level: "principiante",
    description:
      "Excelente para corregir desbalances y trabajar unilateralmente.",
    instructions: [
      "Apoya una rodilla y mano en un banco",
      "Mantén la espalda paralela al suelo",
      "Toma la mancuerna con la mano libre",
      "Tira de la mancuerna hacia la cadera",
      "Baja controladamente",
    ],
    tips: [
      "No rotes el torso",
      "El codo debe ir pegado al cuerpo",
      "Contrae el omóplato al subir",
    ],
    variants: [
      {
        level: "principiante",
        name: "Remo con apoyo",
        description: "Con banco",
      },
      {
        level: "intermedio",
        name: "Remo sin apoyo",
        description: "De pie inclinado",
      },
      { level: "avanzado", name: "Remo Kroc", description: "Alto volumen" },
    ],
  },

  // ============================================
  // PIERNAS
  // ============================================
  {
    id: "sentadilla-barra",
    name: "Sentadilla con Barra",
    category: "piernas",
    level: "intermedio",
    description: "El ejercicio rey para desarrollo de piernas.",
    instructions: [
      "Coloca la barra sobre los trapecios",
      "Pies al ancho de hombros, ligeramente hacia afuera",
      "Baja doblando rodillas y caderas simultáneamente",
      "Desciende hasta que los muslos estén paralelos al suelo",
      "Empuja con los talones para subir",
    ],
    tips: [
      "Mantén las rodillas alineadas con los pies",
      "No despegues los talones del suelo",
      "Mantén el core apretado",
    ],
    variants: [
      {
        level: "principiante",
        name: "Sentadilla goblet",
        description: "Con mancuerna al frente",
      },
      {
        level: "intermedio",
        name: "Sentadilla frontal",
        description: "Barra al frente",
      },
      {
        level: "avanzado",
        name: "Sentadilla búlgara",
        description: "Una pierna elevada",
      },
    ],
  },
  {
    id: "prensa-piernas",
    name: "Prensa de Piernas",
    category: "piernas",
    level: "principiante",
    description: "Ejercicio guiado para cuádriceps y glúteos.",
    instructions: [
      "Siéntate en la máquina con espalda bien apoyada",
      "Coloca los pies en el centro de la plataforma",
      "Baja controladamente doblando las rodillas",
      "Desciende hasta 90 grados",
      "Empuja con toda la planta del pie",
    ],
    tips: [
      "No despegues la zona lumbar",
      "No bloquees las rodillas arriba",
      "Varía la posición de los pies para énfasis",
    ],
    variants: [
      {
        level: "principiante",
        name: "Prensa estándar",
        description: "Pies al centro",
      },
      {
        level: "intermedio",
        name: "Prensa pies altos",
        description: "Más glúteos",
      },
      {
        level: "avanzado",
        name: "Prensa una pierna",
        description: "Unilateral",
      },
    ],
  },
  {
    id: "peso-muerto-rumano",
    name: "Peso Muerto Rumano",
    category: "piernas",
    level: "intermedio",
    description: "Enfoque en femorales y glúteos.",
    instructions: [
      "Sostén la barra con agarre prono",
      "Mantén las piernas casi rectas",
      "Empuja las caderas hacia atrás",
      "Baja la barra rozando las piernas",
      "Siente el estiramiento en femorales",
      "Empuja caderas hacia adelante para subir",
    ],
    tips: [
      "Mantén la espalda recta siempre",
      "Las rodillas apenas se doblan",
      "No redondees la zona lumbar",
    ],
    variants: [
      {
        level: "principiante",
        name: "RDL con mancuernas",
        description: "Más fácil de controlar",
      },
      {
        level: "intermedio",
        name: "RDL una pierna",
        description: "Trabajo unilateral",
      },
      {
        level: "avanzado",
        name: "RDL con déficit",
        description: "Sobre plataforma",
      },
    ],
  },
  {
    id: "zancadas",
    name: "Zancadas",
    category: "piernas",
    level: "principiante",
    description: "Ejercicio unilateral para piernas completas.",
    instructions: [
      "Da un paso largo hacia adelante",
      "Baja la rodilla trasera hacia el suelo",
      "La rodilla delantera debe estar a 90 grados",
      "Empuja con el talón delantero para subir",
      "Alterna las piernas",
    ],
    tips: [
      "La rodilla no debe pasar la punta del pie",
      "Mantén el torso erguido",
      "Usa mancuernas para añadir resistencia",
    ],
    variants: [
      {
        level: "principiante",
        name: "Zancadas estáticas",
        description: "Sin desplazamiento",
      },
      {
        level: "intermedio",
        name: "Zancadas caminando",
        description: "Con movimiento",
      },
      {
        level: "avanzado",
        name: "Zancadas búlgaras",
        description: "Pie trasero elevado",
      },
    ],
  },
  {
    id: "curl-femoral",
    name: "Curl Femoral",
    category: "piernas",
    level: "principiante",
    description: "Aislamiento de femorales.",
    instructions: [
      "Acuéstate boca abajo en la máquina",
      "Ajusta el rodillo sobre los talones",
      "Flexiona las rodillas llevando los talones hacia glúteos",
      "Contrae los femorales arriba",
      "Baja controladamente",
    ],
    tips: [
      "No arquees la espalda",
      "Movimiento controlado",
      "Concéntrate en la contracción",
    ],
    variants: [
      {
        level: "principiante",
        name: "Curl femoral acostado",
        description: "Más estable",
      },
      {
        level: "intermedio",
        name: "Curl femoral sentado",
        description: "Diferente ángulo",
      },
      {
        level: "avanzado",
        name: "Curl femoral nórdico",
        description: "Peso corporal",
      },
    ],
  },
  {
    id: "extension-cuadriceps",
    name: "Extensión de Cuádriceps",
    category: "piernas",
    level: "principiante",
    description: "Aislamiento de cuádriceps.",
    instructions: [
      "Siéntate en la máquina con espalda apoyada",
      "Ajusta el rodillo sobre los tobillos",
      "Extiende las piernas hasta casi bloquear",
      "Contrae los cuádriceps arriba",
      "Baja controladamente",
    ],
    tips: [
      "No uses peso excesivo",
      "Evita si tienes problemas de rodilla",
      "Movimiento fluido",
    ],
    variants: [
      {
        level: "principiante",
        name: "Extensión bilateral",
        description: "Ambas piernas",
      },
      {
        level: "intermedio",
        name: "Extensión unilateral",
        description: "Una pierna",
      },
      {
        level: "avanzado",
        name: "Extensión con pausa",
        description: "Pausa arriba",
      },
    ],
  },
  {
    id: "elevacion-gemelos",
    name: "Elevación de Gemelos",
    category: "piernas",
    level: "principiante",
    description: "Desarrollo de pantorrillas.",
    instructions: [
      "Párate en un escalón con talones colgando",
      "Eleva los talones lo más alto posible",
      "Contrae los gemelos arriba",
      "Baja más allá del nivel del escalón",
      "Siente el estiramiento abajo",
    ],
    tips: [
      "Rango completo de movimiento",
      "Pausa arriba y abajo",
      "Alterna piernas y ambas juntas",
    ],
    variants: [
      {
        level: "principiante",
        name: "Gemelos en máquina",
        description: "Sentado o de pie",
      },
      {
        level: "intermedio",
        name: "Gemelos en prensa",
        description: "Con prensa de piernas",
      },
      {
        level: "avanzado",
        name: "Gemelos una pierna",
        description: "Unilateral",
      },
    ],
  },

  // ============================================
  // HOMBROS
  // ============================================
  {
    id: "press-militar",
    name: "Press Militar con Barra",
    category: "hombros",
    level: "intermedio",
    description: "Ejercicio fundamental para hombros y fuerza overhead.",
    instructions: [
      "Párate con pies al ancho de hombros",
      "Sostén la barra a la altura de los hombros",
      "Empuja la barra verticalmente sobre la cabeza",
      "Extiende completamente los brazos",
      "Baja controladamente a los hombros",
    ],
    tips: [
      "Mantén el core apretado",
      "No arquees excesivamente la espalda",
      "La barra debe ir en línea recta",
    ],
    variants: [
      {
        level: "principiante",
        name: "Press con mancuernas",
        description: "Más natural",
      },
      {
        level: "intermedio",
        name: "Press Arnold",
        description: "Con rotación",
      },
      {
        level: "avanzado",
        name: "Press push press",
        description: "Con impulso de piernas",
      },
    ],
  },
  {
    id: "elevaciones-laterales",
    name: "Elevaciones Laterales",
    category: "hombros",
    level: "principiante",
    description: "Aislamiento del deltoides lateral.",
    instructions: [
      "Párate con mancuernas a los lados",
      "Eleva los brazos lateralmente",
      "Sube hasta la altura de los hombros",
      "Mantén los codos ligeramente flexionados",
      "Baja controladamente",
    ],
    tips: [
      "No uses impulso",
      "Los codos deben estar más altos que las muñecas",
      "Usa peso moderado",
    ],
    variants: [
      {
        level: "principiante",
        name: "Elevaciones en máquina",
        description: "Movimiento guiado",
      },
      {
        level: "intermedio",
        name: "Elevaciones en cable",
        description: "Tensión constante",
      },
      {
        level: "avanzado",
        name: "Elevaciones 21s",
        description: "Método avanzado",
      },
    ],
  },
  {
    id: "elevaciones-frontales",
    name: "Elevaciones Frontales",
    category: "hombros",
    level: "principiante",
    description: "Trabajo del deltoides anterior.",
    instructions: [
      "Sostén mancuernas frente a los muslos",
      "Eleva los brazos al frente",
      "Sube hasta la altura de los ojos",
      "Mantén los brazos casi rectos",
      "Baja controladamente",
    ],
    tips: [
      "No balancees el cuerpo",
      "Alterna brazos para mejor control",
      "Exhala al subir",
    ],
    variants: [
      {
        level: "principiante",
        name: "Frontales con disco",
        description: "Con disco o kettlebell",
      },
      {
        level: "intermedio",
        name: "Frontales alternas",
        description: "Un brazo a la vez",
      },
      {
        level: "avanzado",
        name: "Frontales en polea",
        description: "Con cable",
      },
    ],
  },
  {
    id: "pajaros",
    name: "Pájaros (Deltoides Posterior)",
    category: "hombros",
    level: "principiante",
    description: "Desarrollo del deltoides posterior.",
    instructions: [
      "Inclínate hacia adelante con espalda recta",
      "Sostén mancuernas con brazos colgando",
      "Eleva los brazos lateralmente",
      "Sube hasta la altura del torso",
      "Contrae los omóplatos",
      "Baja controladamente",
    ],
    tips: [
      "Mantén los codos ligeramente flexionados",
      "No uses peso excesivo",
      "Concéntrate en el deltoides posterior",
    ],
    variants: [
      {
        level: "principiante",
        name: "Pájaros en máquina",
        description: "Pec deck inverso",
      },
      {
        level: "intermedio",
        name: "Pájaros en banco",
        description: "Acostado boca abajo",
      },
      { level: "avanzado", name: "Pájaros en cable", description: "Con polea" },
    ],
  },
  {
    id: "remo-alto",
    name: "Remo Alto",
    category: "hombros",
    level: "intermedio",
    description: "Trabajo de deltoides y trapecios.",
    instructions: [
      "Sostén la barra con agarre estrecho",
      "Tira de la barra hacia arriba",
      "Los codos deben subir más alto que las manos",
      "Lleva la barra hasta el pecho",
      "Baja controladamente",
    ],
    tips: [
      "No uses demasiado peso",
      "Los codos van hacia afuera y arriba",
      "Cuidado si tienes problemas de hombro",
    ],
    variants: [
      {
        level: "principiante",
        name: "Remo alto con mancuernas",
        description: "Más natural",
      },
      {
        level: "intermedio",
        name: "Remo alto en cable",
        description: "Con polea",
      },
      {
        level: "avanzado",
        name: "Remo alto agarre ancho",
        description: "Variante difícil",
      },
    ],
  },

  // ============================================
  // BRAZOS
  // ============================================
  {
    id: "curl-barra",
    name: "Curl de Bíceps con Barra",
    category: "brazos",
    level: "principiante",
    description: "Ejercicio clásico para desarrollo de bíceps.",
    instructions: [
      "Párate con pies al ancho de hombros",
      "Sostén la barra con agarre supino",
      "Mantén los codos pegados al cuerpo",
      "Flexiona los brazos llevando la barra al pecho",
      "Baja controladamente sin perder tensión",
    ],
    tips: [
      "No balancees el cuerpo",
      "Mantén los codos fijos",
      "Contracción completa arriba",
    ],
    variants: [
      {
        level: "principiante",
        name: "Curl con mancuernas",
        description: "Alternado o simultáneo",
      },
      {
        level: "intermedio",
        name: "Curl en banco Scott",
        description: "Aislamiento estricto",
      },
      {
        level: "avanzado",
        name: "Curl 21s",
        description: "Método de intensidad",
      },
    ],
  },
  {
    id: "curl-martillo",
    name: "Curl Martillo",
    category: "brazos",
    level: "principiante",
    description: "Desarrollo de bíceps y braquial.",
    instructions: [
      "Sostén mancuernas con agarre neutro",
      "Mantén los codos pegados al cuerpo",
      "Flexiona los brazos manteniendo el agarre",
      "Sube las mancuernas a los hombros",
      "Baja controladamente",
    ],
    tips: [
      "No rotes las muñecas",
      "Movimiento estricto",
      "Puedes alternar brazos",
    ],
    variants: [
      {
        level: "principiante",
        name: "Martillo alternado",
        description: "Un brazo a la vez",
      },
      {
        level: "intermedio",
        name: "Martillo cruzado",
        description: "Cruza al hombro opuesto",
      },
      {
        level: "avanzado",
        name: "Martillo en cable",
        description: "Con cuerda",
      },
    ],
  },
  {
    id: "press-frances",
    name: "Press Francés",
    category: "brazos",
    level: "intermedio",
    description: "Aislamiento de tríceps.",
    instructions: [
      "Acuéstate en banco con barra sobre el pecho",
      "Extiende los brazos perpendiculares al cuerpo",
      "Baja la barra flexionando solo los codos",
      "Lleva la barra hacia la frente o detrás de la cabeza",
      "Extiende los brazos contrayendo tríceps",
    ],
    tips: [
      "Mantén los codos fijos",
      "No uses peso excesivo",
      "Movimiento controlado",
    ],
    variants: [
      {
        level: "principiante",
        name: "Francés con mancuernas",
        description: "Más fácil de controlar",
      },
      {
        level: "intermedio",
        name: "Francés en polea",
        description: "Con cable",
      },
      {
        level: "avanzado",
        name: "Francés declinado",
        description: "Mayor estiramiento",
      },
    ],
  },
  {
    id: "fondos-triceps",
    name: "Fondos para Tríceps",
    category: "brazos",
    level: "intermedio",
    description: "Ejercicio compuesto para tríceps.",
    instructions: [
      "Agarra las barras paralelas",
      "Mantén el cuerpo vertical",
      "Baja doblando los codos",
      "Mantén los codos pegados al cuerpo",
      "Empuja hasta extender los brazos",
    ],
    tips: [
      "Cuerpo más vertical = más tríceps",
      "No bajes demasiado",
      "Usa lastre cuando domines el ejercicio",
    ],
    variants: [
      {
        level: "principiante",
        name: "Fondos en banco",
        description: "Pies en el suelo",
      },
      {
        level: "intermedio",
        name: "Fondos peso corporal",
        description: "En paralelas",
      },
      {
        level: "avanzado",
        name: "Fondos con lastre",
        description: "Peso adicional",
      },
    ],
  },
  {
    id: "extension-triceps",
    name: "Extensión de Tríceps en Polea",
    category: "brazos",
    level: "principiante",
    description: "Aislamiento de tríceps en cable.",
    instructions: [
      "Párate frente a la polea alta",
      "Agarra la barra o cuerda",
      "Mantén los codos pegados al cuerpo",
      "Extiende los brazos hacia abajo",
      "Regresa controladamente",
    ],
    tips: [
      "No muevas los codos",
      "Contracción total abajo",
      "Usa diferentes agarres",
    ],
    variants: [
      {
        level: "principiante",
        name: "Extensión con barra",
        description: "Agarre prono",
      },
      {
        level: "intermedio",
        name: "Extensión con cuerda",
        description: "Mayor rango",
      },
      {
        level: "avanzado",
        name: "Extensión una mano",
        description: "Unilateral",
      },
    ],
  },
  {
    id: "curl-predicador",
    name: "Curl en Banco Scott (Predicador)",
    category: "brazos",
    level: "intermedio",
    description: "Aislamiento estricto de bíceps.",
    instructions: [
      "Siéntate en el banco con axilas sobre el pad",
      "Sostén la barra con agarre supino",
      "Flexiona los brazos sin mover los codos",
      "Sube hasta contracción máxima",
      "Baja controladamente sin perder tensión",
    ],
    tips: [
      "No despegues los brazos del pad",
      "Evita extender completamente abajo",
      "Usa peso controlable",
    ],
    variants: [
      {
        level: "principiante",
        name: "Predicador en máquina",
        description: "Guiado",
      },
      {
        level: "intermedio",
        name: "Predicador con mancuernas",
        description: "Unilateral",
      },
      {
        level: "avanzado",
        name: "Predicador invertido",
        description: "Agarre prono",
      },
    ],
  },

  // ============================================
  // CORE
  // ============================================
  {
    id: "plancha",
    name: "Plancha (Plank)",
    category: "core",
    level: "principiante",
    description: "Ejercicio isométrico para todo el core.",
    instructions: [
      "Apoya antebrazos y puntas de pies en el suelo",
      "Mantén el cuerpo en línea recta",
      "Contrae abdomen y glúteos",
      "Mantén la posición sin dejar caer caderas",
      "Respira normalmente",
    ],
    tips: [
      "No arquees la espalda",
      "Mira hacia abajo",
      "Empieza con 30 segundos",
    ],
    variants: [
      {
        level: "principiante",
        name: "Plancha sobre rodillas",
        description: "Menos intensidad",
      },
      { level: "intermedio", name: "Plancha lateral", description: "Oblicuos" },
      {
        level: "avanzado",
        name: "Plancha con levantamiento",
        description: "Brazo o pierna",
      },
    ],
  },
  {
    id: "abdominales-crunch",
    name: "Abdominales (Crunch)",
    category: "core",
    level: "principiante",
    description: "Ejercicio básico para abdominales superiores.",
    instructions: [
      "Acuéstate boca arriba con rodillas flexionadas",
      "Coloca las manos detrás de la cabeza",
      "Eleva el torso contrayendo el abdomen",
      "Sube solo hasta despegar los omóplatos",
      "Baja controladamente",
    ],
    tips: [
      "No jales el cuello",
      "Exhala al subir",
      "Movimiento corto y controlado",
    ],
    variants: [
      {
        level: "principiante",
        name: "Crunch básico",
        description: "En el suelo",
      },
      {
        level: "intermedio",
        name: "Crunch bicicleta",
        description: "Con torsión",
      },
      {
        level: "avanzado",
        name: "Crunch con peso",
        description: "Disco sobre pecho",
      },
    ],
  },
  {
    id: "elevacion-piernas",
    name: "Elevación de Piernas",
    category: "core",
    level: "intermedio",
    description: "Trabajo de abdominales inferiores.",
    instructions: [
      "Acuéstate boca arriba con piernas extendidas",
      "Coloca las manos bajo los glúteos",
      "Eleva las piernas juntas hacia arriba",
      "Sube hasta 90 grados",
      "Baja controladamente sin tocar el suelo",
    ],
    tips: [
      "Mantén la zona lumbar pegada al suelo",
      "No uses impulso",
      "Flexiona rodillas si es muy difícil",
    ],
    variants: [
      {
        level: "principiante",
        name: "Elevación con rodillas flexionadas",
        description: "Más fácil",
      },
      {
        level: "intermedio",
        name: "Elevación piernas rectas",
        description: "Mayor dificultad",
      },
      {
        level: "avanzado",
        name: "Elevación en barra",
        description: "Colgando",
      },
    ],
  },
  {
    id: "russian-twist",
    name: "Russian Twist",
    category: "core",
    level: "intermedio",
    description: "Trabajo de oblicuos y rotación.",
    instructions: [
      "Siéntate con rodillas flexionadas y pies elevados",
      "Inclina el torso hacia atrás",
      "Sostén un peso frente al pecho",
      "Rota el torso de lado a lado",
      "Toca el suelo a cada lado",
    ],
    tips: [
      "Mantén el core contraído",
      "Movimiento controlado",
      "No uses impulso",
    ],
    variants: [
      {
        level: "principiante",
        name: "Russian twist sin peso",
        description: "Solo peso corporal",
      },
      {
        level: "intermedio",
        name: "Russian twist con disco",
        description: "Con peso",
      },
      {
        level: "avanzado",
        name: "Russian twist con pausa",
        description: "Pausa en cada lado",
      },
    ],
  },
  {
    id: "mountain-climbers",
    name: "Mountain Climbers",
    category: "core",
    level: "intermedio",
    description: "Ejercicio dinámico para core y cardio.",
    instructions: [
      "Comienza en posición de plancha alta",
      "Lleva una rodilla hacia el pecho",
      "Alterna las piernas rápidamente",
      "Mantén las caderas bajas",
      "Respira de manera constante",
    ],
    tips: [
      "Mantén el core apretado",
      "No eleves demasiado las caderas",
      "Aumenta velocidad gradualmente",
    ],
    variants: [
      {
        level: "principiante",
        name: "Mountain climbers lentos",
        description: "Paso a paso",
      },
      {
        level: "intermedio",
        name: "Mountain climbers rápidos",
        description: "Alta velocidad",
      },
      {
        level: "avanzado",
        name: "Mountain climbers cruzados",
        description: "Rodilla al codo opuesto",
      },
    ],
  },
  {
    id: "rueda-abdominal",
    name: "Rueda Abdominal",
    category: "core",
    level: "avanzado",
    description: "Ejercicio avanzado para todo el core.",
    instructions: [
      "Arrodíllate sosteniendo la rueda abdominal",
      "Rueda hacia adelante extendiendo el cuerpo",
      "Mantén los brazos rectos",
      "Extiende lo más posible sin tocar el suelo",
      "Regresa a la posición inicial contrayendo el core",
    ],
    tips: [
      "No arquees la espalda",
      "Mantén el core muy contraído",
      "Empieza con rango corto",
    ],
    variants: [
      {
        level: "principiante",
        name: "Rueda desde rodillas",
        description: "Rango corto",
      },
      {
        level: "intermedio",
        name: "Rueda rango completo",
        description: "Desde rodillas",
      },
      {
        level: "avanzado",
        name: "Rueda de pie",
        description: "Máxima dificultad",
      },
    ],
  },

  // ============================================
  // CARDIO
  // ============================================
  {
    id: "burpees",
    name: "Burpees",
    category: "cardio",
    level: "intermedio",
    description: "Ejercicio de cuerpo completo para cardio intenso.",
    instructions: [
      "Comienza de pie",
      "Baja a posición de sentadilla y coloca manos en el suelo",
      "Lleva pies atrás a posición de plancha",
      "Haz una flexión",
      "Salta con pies hacia las manos",
      "Salta hacia arriba con brazos extendidos",
    ],
    tips: [
      "Mantén el ritmo constante",
      "Modifica intensidad según nivel",
      "Respira correctamente",
    ],
    variants: [
      {
        level: "principiante",
        name: "Burpee sin flexión",
        description: "Sin push-up",
      },
      {
        level: "intermedio",
        name: "Burpee completo",
        description: "Con flexión",
      },
      {
        level: "avanzado",
        name: "Burpee con peso",
        description: "Con chaleco",
      },
    ],
  },
  {
    id: "jumping-jacks",
    name: "Jumping Jacks",
    category: "cardio",
    level: "principiante",
    description: "Ejercicio cardiovascular básico.",
    instructions: [
      "Comienza de pie con brazos a los lados",
      "Salta abriendo piernas y elevando brazos",
      "Junta manos sobre la cabeza",
      "Salta cerrando piernas y bajando brazos",
      "Repite a ritmo constante",
    ],
    tips: [
      "Mantén el ritmo",
      "Aterriza suavemente",
      "Excelente para calentamiento",
    ],
    variants: [
      {
        level: "principiante",
        name: "Jumping jacks bajo impacto",
        description: "Sin saltos",
      },
      {
        level: "intermedio",
        name: "Jumping jacks estándar",
        description: "Ritmo medio",
      },
      {
        level: "avanzado",
        name: "Jumping jacks alta velocidad",
        description: "Máxima intensidad",
      },
    ],
  },
  {
    id: "saltos-caja",
    name: "Saltos a la Caja (Box Jumps)",
    category: "cardio",
    level: "avanzado",
    description: "Ejercicio explosivo para potencia y cardio.",
    instructions: [
      "Párate frente a una caja o plataforma",
      "Flexiona rodillas preparándote para saltar",
      "Salta explosivamente sobre la caja",
      "Aterriza suavemente con ambos pies",
      "Baja y repite",
    ],
    tips: [
      "Empieza con altura baja",
      "Aterriza suavemente",
      "Mantén el pecho hacia arriba",
    ],
    variants: [
      {
        level: "principiante",
        name: "Step-ups",
        description: "Subir sin saltar",
      },
      {
        level: "intermedio",
        name: "Box jumps bajos",
        description: "Caja baja",
      },
      { level: "avanzado", name: "Box jumps altos", description: "Caja alta" },
    ],
  },
  {
    id: "sprints",
    name: "Sprints",
    category: "cardio",
    level: "intermedio",
    description: "Carreras de alta intensidad.",
    instructions: [
      "Calienta adecuadamente",
      "Corre a máxima velocidad por 20-30 segundos",
      "Descansa 60-90 segundos",
      "Repite el intervalo",
      "Mantén buena técnica de carrera",
    ],
    tips: [
      "No hagas sprints sin calentar",
      "Aumenta intensidad gradualmente",
      "Descansa bien entre sprints",
    ],
    variants: [
      {
        level: "principiante",
        name: "Caminata rápida",
        description: "Bajo impacto",
      },
      {
        level: "intermedio",
        name: "Sprints moderados",
        description: "70-80% máximo",
      },
      {
        level: "avanzado",
        name: "Sprints máximos",
        description: "100% esfuerzo",
      },
    ],
  },
  {
    id: "saltar-cuerda",
    name: "Saltar la Cuerda",
    category: "cardio",
    level: "principiante",
    description: "Excelente ejercicio cardiovascular.",
    instructions: [
      "Sostén la cuerda con ambas manos",
      "Salta con ambos pies juntos",
      "Gira la cuerda con las muñecas",
      "Mantén saltos pequeños y rápidos",
      "Respira de manera constante",
    ],
    tips: [
      "Usa calzado adecuado",
      "Superficie amortiguada",
      "Empieza con intervalos cortos",
    ],
    variants: [
      {
        level: "principiante",
        name: "Saltos básicos",
        description: "Ambos pies",
      },
      { level: "intermedio", name: "Saltos alternados", description: "Un pie" },
      {
        level: "avanzado",
        name: "Dobles saltos",
        description: "Dos giros por salto",
      },
    ],
  },
];
