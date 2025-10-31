// ============================================
// ARCHIVO: js/profileAchievements.js
// ============================================

import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getUnlockedAchievements, getUserStats } from "./achievements.js";
import {
  getAllAchievements,
  RARITY_COLORS,
  RARITY_NAMES,
} from "./achievementsData.js";

let currentFilter = "all";
let currentUserId = null;

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("🏆 Módulo de logros iniciado");

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currentUserId = user.uid;
      await loadAchievements(user.uid);
      initializeFilters();
    }
  });
});

// ========================================
// CARGAR LOGROS
// ========================================

async function loadAchievements(userId) {
  try {
    console.log("📥 Cargando logros para:", userId);

    // Obtener logros desbloqueados
    const unlockedAchievements = await getUnlockedAchievements(userId);
    const unlockedIds = unlockedAchievements.map((a) => a.achievementId);

    // Obtener estadísticas del usuario
    const userStats = await getUserStats(userId);

    // Mostrar estadísticas generales
    displayStats(unlockedAchievements.length, userStats.totalPoints || 0);

    // Obtener todos los logros
    const allAchievements = getAllAchievements();

    // Renderizar logros
    renderAchievements(allAchievements, unlockedIds, userStats);

    console.log(
      `✅ ${unlockedAchievements.length}/${allAchievements.length} logros desbloqueados`
    );
  } catch (error) {
    console.error("❌ Error al cargar logros:", error);

    // Mostrar mensaje de error en la UI
    const container = document.getElementById("achievements-grid");
    if (container) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #ff6b6b;">
          ❌ Error al cargar logros. Por favor recarga la página.
        </div>
      `;
    }
  }
}

// ========================================
// MOSTRAR ESTADÍSTICAS
// ========================================

function displayStats(unlockedCount, totalPoints) {
  const statsHTML = `
    <div class="achievements-stats">
      <div class="stat-item">
        <span class="stat-value">${unlockedCount}</span>
        <span class="stat-label">Logros</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">${totalPoints}</span>
        <span class="stat-label">XP Total</span>
      </div>
    </div>
  `;

  const headerElement = document.querySelector(".achievements-header");
  if (headerElement) {
    // Si ya existe stats, actualizar
    const existingStats = headerElement.querySelector(".achievements-stats");
    if (existingStats) {
      existingStats.outerHTML = statsHTML;
    } else {
      headerElement.insertAdjacentHTML("beforeend", statsHTML);
    }
  }
}

// ========================================
// RENDERIZAR LOGROS
// ========================================

function renderAchievements(achievements, unlockedIds, userStats) {
  const container = document.getElementById("achievements-grid");
  if (!container) return;

  container.innerHTML = "";

  // Filtrar logros según filtro actual
  let filteredAchievements = achievements;

  if (currentFilter !== "all") {
    if (currentFilter === "unlocked") {
      filteredAchievements = achievements.filter((a) =>
        unlockedIds.includes(a.id)
      );
    } else if (currentFilter === "locked") {
      filteredAchievements = achievements.filter(
        (a) => !unlockedIds.includes(a.id)
      );
    } else {
      // Filtrar por rareza
      filteredAchievements = achievements.filter(
        (a) => a.rarity === currentFilter
      );
    }
  }

  // Renderizar cada logro
  filteredAchievements.forEach((achievement) => {
    const isUnlocked = unlockedIds.includes(achievement.id);
    const progress = calculateProgress(achievement, userStats);

    const card = createAchievementCard(achievement, isUnlocked, progress);
    container.appendChild(card);
  });

  // Si no hay logros filtrados
  if (filteredAchievements.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #999;">
        No hay logros en esta categoría
      </div>
    `;
  }
}

// ========================================
// CREAR TARJETA DE LOGRO
// ========================================

function createAchievementCard(achievement, isUnlocked, progress) {
  const card = document.createElement("div");
  card.className = `achievement-card ${isUnlocked ? "unlocked" : "locked"}`;
  card.setAttribute("data-rarity", achievement.rarity);

  let progressHTML = "";
  if (!isUnlocked && progress.current < progress.required) {
    const percentage = Math.min(
      (progress.current / progress.required) * 100,
      100
    );
    progressHTML = `
      <div class="achievement-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${percentage}%"></div>
        </div>
        <div class="progress-text">${progress.current}/${progress.required}</div>
      </div>
    `;
  }

  card.innerHTML = `
    <div class="achievement-badge">
      ${isUnlocked ? achievement.icon : "🔒"}
    </div>
    <div class="achievement-info">
      <h3>${achievement.name}</h3>
      <p>${achievement.description}</p>
      <div class="achievement-rarity">${RARITY_NAMES[achievement.rarity]}</div>
      ${
        isUnlocked
          ? `<div class="achievement-points">+${achievement.points} XP</div>`
          : ""
      }
      ${progressHTML}
    </div>
  `;

  return card;
}

// ========================================
// CALCULAR PROGRESO
// ========================================

function calculateProgress(achievement, userStats) {
  let current = 0;
  const required = achievement.requirement;

  switch (achievement.type) {
    case "streak":
      current = userStats.currentStreak || 0;
      break;
    case "pr_count":
      current = userStats.totalPRs || 0;
      break;
    case "total_volume":
      current = userStats.totalVolume || 0;
      break;
    case "workout_count":
      current = userStats.totalWorkouts || 0;
      break;
    case "unique_exercises":
      current = userStats.uniqueExercises || 0;
      break;
    case "muscle_groups":
      current = userStats.muscleGroupsTrained || 0;
      break;
    case "goals_completed":
      current = userStats.goalsCompleted || 0;
      break;
    case "weekend_workouts":
      current = userStats.weekendWorkouts || 0;
      break;
    case "shares":
      current = userStats.totalShares || 0;
      break;
    default:
      current = 0;
  }

  return { current, required };
}

// ========================================
// INICIALIZAR FILTROS
// ========================================

function initializeFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remover active de todos
      filterButtons.forEach((b) => b.classList.remove("active"));

      // Activar el clickeado
      btn.classList.add("active");

      // Actualizar filtro actual
      currentFilter = btn.dataset.filter;

      // Recargar logros con filtro
      if (currentUserId) {
        loadAchievements(currentUserId);
      }
    });
  });
}

console.log("✅ profileAchievements.js cargado");
