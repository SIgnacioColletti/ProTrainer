// ============================================
// ARCHIVO: js/achievementsData.js
// ============================================

/**
 * ========================================
 * BASE DE DATOS DE LOGROS
 * ========================================
 */

export const ACHIEVEMENTS = {
  // ========================================
  // CATEGORÍA: CONSTANCIA
  // ========================================
  consistency: [
    {
      id: "first_week",
      name: "Primera Semana",
      description: "Entrenaste 7 días seguidos",
      icon: "🔥",
      requirement: 7,
      type: "streak",
      points: 100,
      rarity: "common",
    },
    {
      id: "month_warrior",
      name: "Guerrero del Mes",
      description: "Completaste 30 días de entrenamiento",
      icon: "💪",
      requirement: 30,
      type: "streak",
      points: 300,
      rarity: "rare",
    },
    {
      id: "quarter_champion",
      name: "Campeón Trimestral",
      description: "Entrenaste durante 90 días consecutivos",
      icon: "🏆",
      requirement: 90,
      type: "streak",
      points: 500,
      rarity: "epic",
    },
    {
      id: "iron_year",
      name: "Año de Hierro",
      description: "Un año completo de dedicación",
      icon: "👑",
      requirement: 365,
      type: "streak",
      points: 1000,
      rarity: "legendary",
    },
  ],

  // ========================================
  // CATEGORÍA: PERSONAL RECORDS
  // ========================================
  prs: [
    {
      id: "first_pr",
      name: "Primer PR",
      description: "Batiste tu primer récord personal",
      icon: "⭐",
      requirement: 1,
      type: "pr_count",
      points: 50,
      rarity: "common",
    },
    {
      id: "pr_collector",
      name: "Coleccionista de PRs",
      description: "Batiste 10 récords personales",
      icon: "🌟",
      requirement: 10,
      type: "pr_count",
      points: 200,
      rarity: "rare",
    },
    {
      id: "pr_master",
      name: "Maestro de PRs",
      description: "Batiste 50 récords personales",
      icon: "💫",
      requirement: 50,
      type: "pr_count",
      points: 500,
      rarity: "epic",
    },
    {
      id: "record_breaker",
      name: "Rompedor de Récords",
      description: "Batiste 100 récords personales",
      icon: "🏅",
      requirement: 100,
      type: "pr_count",
      points: 1000,
      rarity: "legendary",
    },
  ],

  // ========================================
  // CATEGORÍA: VOLUMEN
  // ========================================
  volume: [
    {
      id: "ton_10",
      name: "10 Toneladas",
      description: "Levantaste 10,000 kg totales",
      icon: "🔨",
      requirement: 10000,
      type: "total_volume",
      points: 100,
      rarity: "common",
    },
    {
      id: "ton_50",
      name: "50 Toneladas",
      description: "Levantaste 50,000 kg totales",
      icon: "⚒️",
      requirement: 50000,
      type: "total_volume",
      points: 300,
      rarity: "rare",
    },
    {
      id: "ton_100",
      name: "100 Toneladas",
      description: "Levantaste 100,000 kg totales",
      icon: "🔩",
      requirement: 100000,
      type: "total_volume",
      points: 500,
      rarity: "epic",
    },
    {
      id: "ton_500",
      name: "500 Toneladas",
      description: "Levantaste 500,000 kg totales",
      icon: "⚙️",
      requirement: 500000,
      type: "total_volume",
      points: 1000,
      rarity: "legendary",
    },
  ],

  // ========================================
  // CATEGORÍA: ENTRENAMIENTOS
  // ========================================
  workouts: [
    {
      id: "first_workout",
      name: "Primer Entrenamiento",
      description: "Completaste tu primer entrenamiento",
      icon: "🎯",
      requirement: 1,
      type: "workout_count",
      points: 50,
      rarity: "common",
    },
    {
      id: "workout_25",
      name: "25 Entrenamientos",
      description: "Completaste 25 entrenamientos",
      icon: "💪",
      requirement: 25,
      type: "workout_count",
      points: 150,
      rarity: "common",
    },
    {
      id: "workout_50",
      name: "50 Entrenamientos",
      description: "Completaste 50 entrenamientos",
      icon: "🏋️",
      requirement: 50,
      type: "workout_count",
      points: 250,
      rarity: "rare",
    },
    {
      id: "workout_100",
      name: "100 Entrenamientos",
      description: "Completaste 100 entrenamientos",
      icon: "💯",
      requirement: 100,
      type: "workout_count",
      points: 400,
      rarity: "epic",
    },
    {
      id: "workout_500",
      name: "500 Entrenamientos",
      description: "Completaste 500 entrenamientos",
      icon: "🔱",
      requirement: 500,
      type: "workout_count",
      points: 1000,
      rarity: "legendary",
    },
  ],

  // ========================================
  // CATEGORÍA: EXPLORADOR
  // ========================================
  explorer: [
    {
      id: "exercise_10",
      name: "Novato Curioso",
      description: "Probaste 10 ejercicios diferentes",
      icon: "🔍",
      requirement: 10,
      type: "unique_exercises",
      points: 100,
      rarity: "common",
    },
    {
      id: "exercise_50",
      name: "Explorador",
      description: "Probaste 50 ejercicios diferentes",
      icon: "🗺️",
      requirement: 50,
      type: "unique_exercises",
      points: 300,
      rarity: "rare",
    },
    {
      id: "exercise_100",
      name: "Maestro del Movimiento",
      description: "Probaste 100 ejercicios diferentes",
      icon: "🧭",
      requirement: 100,
      type: "unique_exercises",
      points: 500,
      rarity: "epic",
    },
    {
      id: "all_categories",
      name: "Cuerpo Completo",
      description: "Entrenaste todos los grupos musculares",
      icon: "🎨",
      requirement: 7,
      type: "muscle_groups",
      points: 400,
      rarity: "epic",
    },
  ],

  // ========================================
  // CATEGORÍA: OBJETIVOS
  // ========================================
  goals: [
    {
      id: "first_goal",
      name: "Meta Alcanzada",
      description: "Cumpliste tu primer objetivo",
      icon: "🎯",
      requirement: 1,
      type: "goals_completed",
      points: 200,
      rarity: "rare",
    },
    {
      id: "goal_5",
      name: "Determinado",
      description: "Cumpliste 5 objetivos",
      icon: "🎪",
      requirement: 5,
      type: "goals_completed",
      points: 400,
      rarity: "epic",
    },
    {
      id: "transformation",
      name: "Transformación",
      description: "Alcanzaste tu peso objetivo",
      icon: "✨",
      requirement: 1,
      type: "weight_goal",
      points: 500,
      rarity: "epic",
    },
  ],

  // ========================================
  // CATEGORÍA: ESPECIALES
  // ========================================
  special: [
    {
      id: "early_bird",
      name: "Madrugador",
      description: "Entrenaste antes de las 7 AM",
      icon: "🌅",
      requirement: 1,
      type: "early_workout",
      points: 100,
      rarity: "rare",
    },
    {
      id: "night_owl",
      name: "Búho Nocturno",
      description: "Entrenaste después de las 10 PM",
      icon: "🦉",
      requirement: 1,
      type: "late_workout",
      points: 100,
      rarity: "rare",
    },
    {
      id: "weekend_warrior",
      name: "Guerrero del Fin de Semana",
      description: "Entrenaste todos los fines de semana del mes",
      icon: "🏖️",
      requirement: 8,
      type: "weekend_workouts",
      points: 200,
      rarity: "rare",
    },
    {
      id: "social_butterfly",
      name: "Mariposa Social",
      description: "Compartiste 10 logros",
      icon: "🦋",
      requirement: 10,
      type: "shares",
      points: 150,
      rarity: "common",
    },
  ],
};

// ========================================
// COLORES POR RAREZA
// ========================================
export const RARITY_COLORS = {
  common: "#B8B8B8", // Gris
  rare: "#4A90E2", // Azul
  epic: "#9B59B6", // Púrpura
  legendary: "#F39C12", // Dorado
};

// ========================================
// NOMBRES DE RAREZA
// ========================================
export const RARITY_NAMES = {
  common: "Común",
  rare: "Raro",
  epic: "Épico",
  legendary: "Legendario",
};

// ========================================
// OBTENER TODOS LOS LOGROS
// ========================================
export function getAllAchievements() {
  const all = [];

  Object.values(ACHIEVEMENTS).forEach((category) => {
    all.push(...category);
  });

  return all;
}

// ========================================
// OBTENER LOGRO POR ID
// ========================================
export function getAchievementById(id) {
  return getAllAchievements().find((achievement) => achievement.id === id);
}

console.log("✅ achievementsData.js cargado");
