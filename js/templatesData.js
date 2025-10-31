// ============================================
// ARCHIVO: js/templatesData.js
// ============================================

// Base de datos de plantillas de rutinas profesionales
export const templatesDatabase = [
  // ============================================
  // PRINCIPIANTE
  // ============================================
  {
    id: "full-body-beginner",
    name: "Full Body Principiante",
    level: "principiante",
    category: "hipertrofia",
    days: 3,
    duration: "45-60",
    description:
      "Rutina ideal para comenzar en el gimnasio. Trabaja todo el cuerpo 3 veces por semana con ejercicios básicos y seguros.",
    goals: [
      "Aprender técnica correcta de ejercicios",
      "Desarrollar fuerza base",
      "Crear hábito de entrenamiento",
      "Preparar el cuerpo para rutinas avanzadas",
    ],
    schedule: "Lunes, Miércoles, Viernes",
    exercises: [
      {
        name: "Sentadilla con Barra",
        category: "piernas",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Press de Banca Plano",
        category: "pecho",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Remo con Barra",
        category: "espalda",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Press Militar con Barra",
        category: "hombros",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Curl de Bíceps con Barra",
        category: "brazos",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Extensión de Tríceps en Polea",
        category: "brazos",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Plancha (Plank)",
        category: "core",
        sets: [
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
        ],
      },
    ],
  },
  {
    id: "upper-lower-beginner",
    name: "Upper/Lower Principiante",
    level: "principiante",
    category: "fuerza",
    days: 4,
    duration: "50-65",
    description:
      "Divide el entrenamiento entre tren superior e inferior, permitiendo mayor recuperación y volumen de trabajo.",
    goals: [
      "Mayor frecuencia de entrenamiento",
      "Mejor recuperación muscular",
      "Desarrollo equilibrado",
      "Preparación para rutinas intermedias",
    ],
    schedule:
      "Lunes (Superior), Martes (Inferior), Jueves (Superior), Viernes (Inferior)",
    exercises: [
      // Día Superior
      {
        name: "Press de Banca Plano",
        category: "pecho",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Remo con Barra",
        category: "espalda",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Press Militar con Barra",
        category: "hombros",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Curl de Bíceps con Barra",
        category: "brazos",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Press Francés",
        category: "brazos",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      // Día Inferior
      {
        name: "Sentadilla con Barra",
        category: "piernas",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Peso Muerto Rumano",
        category: "piernas",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Prensa de Piernas",
        category: "piernas",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Curl Femoral",
        category: "piernas",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Elevación de Gemelos",
        category: "piernas",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Plancha (Plank)",
        category: "core",
        sets: [
          { weight: 0, reps: 45 },
          { weight: 0, reps: 45 },
        ],
      },
    ],
  },

  // ============================================
  // INTERMEDIO
  // ============================================
  {
    id: "push-pull-legs",
    name: "Push/Pull/Legs (PPL)",
    level: "intermedio",
    category: "hipertrofia",
    days: 6,
    duration: "60-75",
    description:
      "La rutina más popular para hipertrofia. Divide los grupos musculares en empuje, tirón y piernas, entrenando cada uno dos veces por semana.",
    goals: [
      "Máxima hipertrofia muscular",
      "Alta frecuencia de entrenamiento",
      "Volumen óptimo por grupo muscular",
      "Resultados visibles en 8-12 semanas",
    ],
    schedule:
      "Lun (Push), Mar (Pull), Mié (Legs), Jue (Push), Vie (Pull), Sáb (Legs)",
    exercises: [
      // Push Day
      {
        name: "Press de Banca Plano",
        category: "pecho",
        sets: [
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
        ],
      },
      {
        name: "Press Inclinado con Barra",
        category: "pecho",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Aperturas con Mancuernas",
        category: "pecho",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Press Militar con Barra",
        category: "hombros",
        sets: [
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
        ],
      },
      {
        name: "Elevaciones Laterales",
        category: "hombros",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Press Francés",
        category: "brazos",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Extensión de Tríceps en Polea",
        category: "brazos",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      // Pull Day
      {
        name: "Peso Muerto",
        category: "espalda",
        sets: [
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
        ],
      },
      {
        name: "Dominadas",
        category: "espalda",
        sets: [
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
        ],
      },
      {
        name: "Remo con Barra",
        category: "espalda",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Remo con Mancuerna a Una Mano",
        category: "espalda",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Curl de Bíceps con Barra",
        category: "brazos",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Curl Martillo",
        category: "brazos",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Pájaros (Deltoides Posterior)",
        category: "hombros",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      // Leg Day
      {
        name: "Sentadilla con Barra",
        category: "piernas",
        sets: [
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
        ],
      },
      {
        name: "Prensa de Piernas",
        category: "piernas",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Peso Muerto Rumano",
        category: "piernas",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Zancadas",
        category: "piernas",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Curl Femoral",
        category: "piernas",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Extensión de Cuádriceps",
        category: "piernas",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Elevación de Gemelos",
        category: "piernas",
        sets: [
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
        ],
      },
    ],
  },
  {
    id: "upper-lower-intermediate",
    name: "Upper/Lower Intermedio",
    level: "intermedio",
    category: "fuerza",
    days: 4,
    duration: "70-85",
    description:
      "Versión avanzada del Upper/Lower con mayor volumen e intensidad. Perfecta para ganar fuerza y masa muscular.",
    goals: [
      "Aumento significativo de fuerza",
      "Hipertrofia balanceada",
      "Mejor recuperación que PPL",
      "Ideal para intermedios/avanzados",
    ],
    schedule: "Lun (Superior), Mar (Inferior), Jue (Superior), Vie (Inferior)",
    exercises: [
      // Upper 1
      {
        name: "Press de Banca Plano",
        category: "pecho",
        sets: [
          { weight: 0, reps: 6 },
          { weight: 0, reps: 6 },
          { weight: 0, reps: 6 },
          { weight: 0, reps: 6 },
        ],
      },
      {
        name: "Remo con Barra",
        category: "espalda",
        sets: [
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
        ],
      },
      {
        name: "Press Militar con Barra",
        category: "hombros",
        sets: [
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
        ],
      },
      {
        name: "Dominadas",
        category: "espalda",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Fondos en Paralelas",
        category: "pecho",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Curl de Bíceps con Barra",
        category: "brazos",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Press Francés",
        category: "brazos",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      // Lower 1
      {
        name: "Sentadilla con Barra",
        category: "piernas",
        sets: [
          { weight: 0, reps: 6 },
          { weight: 0, reps: 6 },
          { weight: 0, reps: 6 },
          { weight: 0, reps: 6 },
        ],
      },
      {
        name: "Peso Muerto Rumano",
        category: "piernas",
        sets: [
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
        ],
      },
      {
        name: "Prensa de Piernas",
        category: "piernas",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Curl Femoral",
        category: "piernas",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Extensión de Cuádriceps",
        category: "piernas",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Elevación de Gemelos",
        category: "piernas",
        sets: [
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
        ],
      },
      {
        name: "Plancha (Plank)",
        category: "core",
        sets: [
          { weight: 0, reps: 60 },
          { weight: 0, reps: 60 },
        ],
      },
    ],
  },
  {
    id: "arnold-split",
    name: "Arnold Split",
    level: "intermedio",
    category: "hipertrofia",
    days: 6,
    duration: "75-90",
    description:
      "La rutina legendaria de Arnold Schwarzenegger. Combina pecho/espalda, hombros/brazos, y piernas dos veces por semana.",
    goals: [
      "Máxima congestión muscular",
      "Desarrollo de músculos antagónicos",
      "Alto volumen de entrenamiento",
      "Estética clásica de culturismo",
    ],
    schedule:
      "Lun/Jue (Pecho/Espalda), Mar/Vie (Hombros/Brazos), Mié/Sáb (Piernas)",
    exercises: [
      // Pecho/Espalda
      {
        name: "Press de Banca Plano",
        category: "pecho",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Dominadas",
        category: "espalda",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Press Inclinado con Barra",
        category: "pecho",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Remo con Barra",
        category: "espalda",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Aperturas con Mancuernas",
        category: "pecho",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Peso Muerto",
        category: "espalda",
        sets: [
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
        ],
      },
      // Hombros/Brazos
      {
        name: "Press Militar con Barra",
        category: "hombros",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Elevaciones Laterales",
        category: "hombros",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Pájaros (Deltoides Posterior)",
        category: "hombros",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Curl de Bíceps con Barra",
        category: "brazos",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Press Francés",
        category: "brazos",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Curl Martillo",
        category: "brazos",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Fondos para Tríceps",
        category: "brazos",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      // Piernas
      {
        name: "Sentadilla con Barra",
        category: "piernas",
        sets: [
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
        ],
      },
      {
        name: "Peso Muerto Rumano",
        category: "piernas",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Prensa de Piernas",
        category: "piernas",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Zancadas",
        category: "piernas",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Curl Femoral",
        category: "piernas",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Elevación de Gemelos",
        category: "piernas",
        sets: [
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
        ],
      },
    ],
  },

  // ============================================
  // AVANZADO
  // ============================================
  {
    id: "stronglifts-5x5",
    name: "StrongLifts 5x5",
    level: "avanzado",
    category: "fuerza",
    days: 3,
    duration: "60-75",
    description:
      "Programa de fuerza clásico. 5 series de 5 repeticiones en ejercicios compuestos, aumentando peso cada sesión.",
    goals: [
      "Máxima ganancia de fuerza",
      "Desarrollo neuromuscular",
      "Técnica perfecta en básicos",
      "Base sólida para powerlifting",
    ],
    schedule: "Lun/Mié/Vie alternando Workout A y B",
    exercises: [
      // Workout A
      {
        name: "Sentadilla con Barra",
        category: "piernas",
        sets: [
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
        ],
      },
      {
        name: "Press de Banca Plano",
        category: "pecho",
        sets: [
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
        ],
      },
      {
        name: "Remo con Barra",
        category: "espalda",
        sets: [
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
        ],
      },
      // Workout B
      {
        name: "Sentadilla con Barra",
        category: "piernas",
        sets: [
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
        ],
      },
      {
        name: "Press Militar con Barra",
        category: "hombros",
        sets: [
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
        ],
      },
      {
        name: "Peso Muerto",
        category: "espalda",
        sets: [{ weight: 0, reps: 5 }],
      },
    ],
  },
  {
    id: "german-volume-training",
    name: "German Volume Training (GVT)",
    level: "avanzado",
    category: "hipertrofia",
    days: 5,
    duration: "60-75",
    description:
      "10 series de 10 repeticiones en ejercicio principal. Extremadamente exigente, diseñado para romper mesetas de hipertrofia.",
    goals: [
      "Hipertrofia extrema",
      "Superar mesetas",
      "Capacidad de trabajo",
      "Resistencia muscular",
    ],
    schedule:
      "Lun (Pecho/Espalda), Mar (Piernas), Jue (Hombros/Brazos), Vie (Pecho/Espalda), Sáb (Piernas)",
    exercises: [
      // Pecho/Espalda
      {
        name: "Press de Banca Plano",
        category: "pecho",
        sets: Array(10).fill({ weight: 0, reps: 10 }),
      },
      {
        name: "Dominadas",
        category: "espalda",
        sets: Array(10).fill({ weight: 0, reps: 10 }),
      },
      {
        name: "Aperturas con Mancuernas",
        category: "pecho",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      // Piernas
      {
        name: "Sentadilla con Barra",
        category: "piernas",
        sets: Array(10).fill({ weight: 0, reps: 10 }),
      },
      {
        name: "Curl Femoral",
        category: "piernas",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Elevación de Gemelos",
        category: "piernas",
        sets: [
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
        ],
      },
      // Hombros/Brazos
      {
        name: "Press Militar con Barra",
        category: "hombros",
        sets: Array(10).fill({ weight: 0, reps: 10 }),
      },
      {
        name: "Curl de Bíceps con Barra",
        category: "brazos",
        sets: Array(10).fill({ weight: 0, reps: 10 }),
      },
      {
        name: "Elevaciones Laterales",
        category: "hombros",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
    ],
  },
  {
    id: "ppl-advanced",
    name: "Push/Pull/Legs Avanzado",
    level: "avanzado",
    category: "hipertrofia",
    days: 6,
    duration: "90-120",
    description:
      "Versión avanzada del PPL con altísimo volumen, técnicas de intensidad y periodización.",
    goals: [
      "Máximo desarrollo muscular",
      "Definición extrema",
      "Volumen de entrenamiento alto",
      "Para atletas experimentados",
    ],
    schedule: "Lun/Jue (Push), Mar/Vie (Pull), Mié/Sáb (Legs)",
    exercises: [
      // Push
      {
        name: "Press de Banca Plano",
        category: "pecho",
        sets: [
          { weight: 0, reps: 6 },
          { weight: 0, reps: 6 },
          { weight: 0, reps: 6 },
          { weight: 0, reps: 6 },
          { weight: 0, reps: 6 },
        ],
      },
      {
        name: "Press Inclinado con Barra",
        category: "pecho",
        sets: [
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
        ],
      },
      {
        name: "Aperturas con Mancuernas",
        category: "pecho",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Fondos en Paralelas",
        category: "pecho",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Press Militar con Barra",
        category: "hombros",
        sets: [
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
        ],
      },
      {
        name: "Elevaciones Laterales",
        category: "hombros",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Press Francés",
        category: "brazos",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Extensión de Tríceps en Polea",
        category: "brazos",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      // Pull
      {
        name: "Peso Muerto",
        category: "espalda",
        sets: [
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
        ],
      },
      {
        name: "Dominadas",
        category: "espalda",
        sets: [
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
        ],
      },
      {
        name: "Remo con Barra",
        category: "espalda",
        sets: [
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
        ],
      },
      {
        name: "Remo con Mancuerna a Una Mano",
        category: "espalda",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Curl de Bíceps con Barra",
        category: "brazos",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Curl Martillo",
        category: "brazos",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Pájaros (Deltoides Posterior)",
        category: "hombros",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      // Legs
      {
        name: "Sentadilla con Barra",
        category: "piernas",
        sets: [
          { weight: 0, reps: 6 },
          { weight: 0, reps: 6 },
          { weight: 0, reps: 6 },
          { weight: 0, reps: 6 },
          { weight: 0, reps: 6 },
        ],
      },
      {
        name: "Prensa de Piernas",
        category: "piernas",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Peso Muerto Rumano",
        category: "piernas",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        name: "Zancadas",
        category: "piernas",
        sets: [
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
          { weight: 0, reps: 12 },
        ],
      },
      {
        name: "Curl Femoral",
        category: "piernas",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Extensión de Cuádriceps",
        category: "piernas",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Elevación de Gemelos",
        category: "piernas",
        sets: [
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
        ],
      },
    ],
  },

  // ============================================
  // PÉRDIDA DE PESO / RESISTENCIA
  // ============================================
  {
    id: "fat-loss-circuit",
    name: "Circuito Quema Grasa",
    level: "intermedio",
    category: "perdida-peso",
    days: 4,
    duration: "45-60",
    description:
      "Rutina de alta intensidad combinando pesas y cardio para máxima quema de calorías y definición muscular.",
    goals: [
      "Máxima quema de calorías",
      "Mantener masa muscular",
      "Mejorar condición física",
      "Definición muscular",
    ],
    schedule: "Lun/Mar/Jue/Sáb",
    exercises: [
      {
        name: "Burpees",
        category: "cardio",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Sentadilla con Barra",
        category: "piernas",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Flexiones de Pecho",
        category: "pecho",
        sets: [
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
        ],
      },
      {
        name: "Mountain Climbers",
        category: "core",
        sets: [
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
        ],
      },
      {
        name: "Remo con Barra",
        category: "espalda",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Jumping Jacks",
        category: "cardio",
        sets: [
          { weight: 0, reps: 40 },
          { weight: 0, reps: 40 },
          { weight: 0, reps: 40 },
        ],
      },
      {
        name: "Zancadas",
        category: "piernas",
        sets: [
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
        ],
      },
      {
        name: "Plancha (Plank)",
        category: "core",
        sets: [
          { weight: 0, reps: 60 },
          { weight: 0, reps: 60 },
        ],
      },
    ],
  },
  {
    id: "crossfit-style",
    name: "Estilo CrossFit",
    level: "avanzado",
    category: "resistencia",
    days: 5,
    duration: "60-75",
    description:
      "WODs (Workout of the Day) de alta intensidad combinando levantamiento olímpico, gimnasia y cardio metabólico.",
    goals: [
      "Condición física completa",
      "Fuerza funcional",
      "Resistencia cardiovascular",
      "Agilidad y coordinación",
    ],
    schedule: "Lun/Mar/Mié/Vie/Sáb",
    exercises: [
      {
        name: "Sentadilla con Barra",
        category: "piernas",
        sets: [
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
        ],
      },
      {
        name: "Dominadas",
        category: "espalda",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Burpees",
        category: "cardio",
        sets: [
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
        ],
      },
      {
        name: "Peso Muerto",
        category: "espalda",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Saltos a la Caja (Box Jumps)",
        category: "cardio",
        sets: [
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
        ],
      },
      {
        name: "Press Militar con Barra",
        category: "hombros",
        sets: [
          { weight: 0, reps: 15 },
          { weight: 0, reps: 15 },
        ],
      },
      {
        name: "Saltar la Cuerda",
        category: "cardio",
        sets: [
          { weight: 0, reps: 100 },
          { weight: 0, reps: 100 },
        ],
      },
      {
        name: "Russian Twist",
        category: "core",
        sets: [
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
        ],
      },
    ],
  },
];
