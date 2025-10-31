// ============================================
// ARCHIVO: js/analytics.js
// ============================================

import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Variables globales
let currentUserId = null;
let currentPeriod = 30;
let allWorkouts = [];
let charts = {};

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("📊 Analytics iniciado");

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currentUserId = user.uid;
      await loadAnalytics();
      initializePeriodSelector();
    } else {
      window.location.href = "../index.html";
    }
  });
});

// ========================================
// CARGAR ANALYTICS
// ========================================

async function loadAnalytics() {
  showLoading(true);

  try {
    console.log("📥 Cargando datos de analytics...");

    // Cargar todos los entrenamientos
    await loadWorkouts();

    // Generar estadísticas
    await generateStats();

    // Generar gráficos
    await generateCharts();

    // Generar insights
    generateInsights();

    // Generar heatmap
    generateHeatmap();

    // Cargar PRs
    loadPRs();

    console.log("✅ Analytics cargado completamente");
  } catch (error) {
    console.error("❌ Error al cargar analytics:", error);
  } finally {
    showLoading(false);
  }
}

// ========================================
// CARGAR ENTRENAMIENTOS
// ========================================

async function loadWorkouts() {
  try {
    const workoutsRef = collection(db, "workouts");
    const q = query(
      workoutsRef,
      where("userId", "==", currentUserId),
      orderBy("startTime", "desc")
    );

    const snapshot = await getDocs(q);
    allWorkouts = [];

    snapshot.forEach((doc) => {
      allWorkouts.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    console.log(`📦 ${allWorkouts.length} entrenamientos cargados`);

    // Filtrar por período
    filterWorkoutsByPeriod();
  } catch (error) {
    console.error("❌ Error al cargar entrenamientos:", error);
    allWorkouts = [];
  }
}

// ========================================
// FILTRAR POR PERÍODO
// ========================================

function filterWorkoutsByPeriod() {
  if (currentPeriod === "all") {
    return allWorkouts;
  }

  const now = new Date();
  const periodStart = new Date(
    now.getTime() - currentPeriod * 24 * 60 * 60 * 1000
  );

  return allWorkouts.filter((workout) => {
    const workoutDate =
      workout.startTime?.toDate() || new Date(workout.startTime);
    return workoutDate >= periodStart;
  });
}

// ========================================
// GENERAR ESTADÍSTICAS
// ========================================

async function generateStats() {
  const filteredWorkouts = filterWorkoutsByPeriod();

  // Total de entrenamientos
  const totalWorkouts = filteredWorkouts.length;
  document.getElementById("total-workouts").textContent = totalWorkouts;

  // Volumen total
  let totalVolume = 0;
  filteredWorkouts.forEach((workout) => {
    if (workout.totalVolume) {
      totalVolume += workout.totalVolume;
    }
  });
  document.getElementById("total-volume").textContent = `${(
    totalVolume / 1000
  ).toFixed(1)} ton`;

  // Mejor racha
  const bestStreak = calculateBestStreak(filteredWorkouts);
  document.getElementById("best-streak").textContent = `${bestStreak} días`;

  // Tiempo total
  let totalTime = 0;
  filteredWorkouts.forEach((workout) => {
    if (workout.endTime && workout.startTime) {
      const start = workout.startTime?.toDate() || new Date(workout.startTime);
      const end = workout.endTime?.toDate() || new Date(workout.endTime);
      totalTime += (end - start) / (1000 * 60 * 60); // horas
    }
  });
  document.getElementById("total-time").textContent = `${totalTime.toFixed(
    1
  )}h`;
}

// ========================================
// CALCULAR MEJOR RACHA
// ========================================

function calculateBestStreak(workouts) {
  if (workouts.length === 0) return 0;

  // Ordenar por fecha
  const sortedWorkouts = [...workouts].sort((a, b) => {
    const dateA = a.startTime?.toDate() || new Date(a.startTime);
    const dateB = b.startTime?.toDate() || new Date(b.startTime);
    return dateA - dateB;
  });

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < sortedWorkouts.length; i++) {
    const prevDate =
      sortedWorkouts[i - 1].startTime?.toDate() ||
      new Date(sortedWorkouts[i - 1].startTime);
    const currDate =
      sortedWorkouts[i].startTime?.toDate() ||
      new Date(sortedWorkouts[i].startTime);

    const diffDays = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else if (diffDays > 1) {
      currentStreak = 1;
    }
  }

  return maxStreak;
}

// ========================================
// GENERAR GRÁFICOS
// ========================================

async function generateCharts() {
  generateFrequencyChart();
  generateMuscleChart();
  generateDaysChart();
  await loadExercisesForStrengthChart();
}

// ========================================
// GRÁFICO: FRECUENCIA
// ========================================

function generateFrequencyChart() {
  const filteredWorkouts = filterWorkoutsByPeriod();

  // Agrupar por semana
  const weeklyData = {};

  filteredWorkouts.forEach((workout) => {
    const date = workout.startTime?.toDate() || new Date(workout.startTime);
    const weekStart = getWeekStart(date);
    const weekKey = weekStart.toISOString().split("T")[0];

    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = 0;
    }
    weeklyData[weekKey]++;
  });

  // Ordenar por fecha
  const sortedWeeks = Object.keys(weeklyData).sort();
  const labels = sortedWeeks.map((week) => {
    const date = new Date(week);
    return date.toLocaleDateString("es-AR", { day: "2-digit", month: "short" });
  });
  const data = sortedWeeks.map((week) => weeklyData[week]);

  // Calcular promedio
  const average =
    data.length > 0
      ? (data.reduce((a, b) => a + b, 0) / data.length).toFixed(1)
      : 0;

  // Destruir gráfico anterior si existe
  if (charts.frequency) {
    charts.frequency.destroy();
  }

  // Crear gráfico
  const ctx = document.getElementById("frequency-chart");
  charts.frequency = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Entrenamientos por semana",
          data: data,
          borderColor: "#00FF88",
          backgroundColor: "rgba(0, 255, 136, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#00FF88",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#1a1a1a",
          titleColor: "#00FF88",
          bodyColor: "#FFFFFF",
          borderColor: "#00FF88",
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            afterBody: () => `Promedio: ${average} entrenamientos/semana`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#999",
            stepSize: 1,
          },
          grid: {
            color: "#2a2a2a",
          },
        },
        x: {
          ticks: {
            color: "#999",
            maxRotation: 45,
            minRotation: 45,
          },
          grid: {
            color: "#2a2a2a",
          },
        },
      },
    },
  });
}

// ========================================
// GRÁFICO: GRUPOS MUSCULARES
// ========================================

function generateMuscleChart() {
  const filteredWorkouts = filterWorkoutsByPeriod();

  // Definir grupos musculares
  const muscleGroups = {
    Pecho: 0,
    Espalda: 0,
    Piernas: 0,
    Hombros: 0,
    Brazos: 0,
    Core: 0,
  };

  // Calcular volumen por grupo
  filteredWorkouts.forEach((workout) => {
    if (workout.exercises) {
      workout.exercises.forEach((exercise) => {
        const group = exercise.muscleGroup || "Otro";
        if (muscleGroups.hasOwnProperty(group)) {
          const volume =
            (exercise.sets || 0) *
            (exercise.reps || 0) *
            (exercise.weight || 0);
          muscleGroups[group] += volume;
        }
      });
    }
  });

  // Preparar datos
  const labels = Object.keys(muscleGroups);
  const data = Object.values(muscleGroups).map((v) => (v / 1000).toFixed(1));

  // Destruir gráfico anterior
  if (charts.muscle) {
    charts.muscle.destroy();
  }

  // Crear gráfico
  const ctx = document.getElementById("muscle-chart");
  charts.muscle = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Volumen (ton)",
          data: data,
          backgroundColor: [
            "rgba(0, 255, 136, 0.8)",
            "rgba(0, 153, 94, 0.8)",
            "rgba(0, 255, 136, 0.6)",
            "rgba(0, 153, 94, 0.6)",
            "rgba(0, 255, 136, 0.4)",
            "rgba(0, 153, 94, 0.4)",
          ],
          borderColor: "#00FF88",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#1a1a1a",
          titleColor: "#00FF88",
          bodyColor: "#FFFFFF",
          borderColor: "#00FF88",
          borderWidth: 1,
          padding: 12,
          displayColors: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#999",
            callback: (value) => value + " ton",
          },
          grid: {
            color: "#2a2a2a",
          },
        },
        x: {
          ticks: {
            color: "#999",
          },
          grid: {
            display: false,
          },
        },
      },
    },
  });
}

// ========================================
// GRÁFICO: DÍAS DE LA SEMANA
// ========================================

function generateDaysChart() {
  const filteredWorkouts = filterWorkoutsByPeriod();

  const daysCount = {
    Lun: 0,
    Mar: 0,
    Mié: 0,
    Jue: 0,
    Vie: 0,
    Sáb: 0,
    Dom: 0,
  };

  const daysMap = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  filteredWorkouts.forEach((workout) => {
    const date = workout.startTime?.toDate() || new Date(workout.startTime);
    const dayName = daysMap[date.getDay()];
    daysCount[dayName]++;
  });

  // Encontrar día favorito
  let favoriteDay = "Lunes";
  let maxCount = 0;
  Object.entries(daysCount).forEach(([day, count]) => {
    if (count > maxCount) {
      maxCount = count;
      favoriteDay = day;
    }
  });

  // Mostrar info
  const favDayInfo = document.getElementById("favorite-day-info");
  if (maxCount > 0) {
    favDayInfo.innerHTML = `<p>Tu día favorito para entrenar es <strong>${favoriteDay}</strong> con <strong>${maxCount} entrenamientos</strong>.</p>`;
  } else {
    favDayInfo.innerHTML =
      "<p>Aún no hay suficientes datos para determinar tu día favorito.</p>";
  }

  // Destruir gráfico anterior
  if (charts.days) {
    charts.days.destroy();
  }

  // Crear gráfico
  const ctx = document.getElementById("days-chart");
  charts.days = new Chart(ctx, {
    type: "polarArea",
    data: {
      labels: Object.keys(daysCount),
      datasets: [
        {
          data: Object.values(daysCount),
          backgroundColor: [
            "rgba(0, 255, 136, 0.8)",
            "rgba(0, 255, 136, 0.7)",
            "rgba(0, 255, 136, 0.6)",
            "rgba(0, 255, 136, 0.5)",
            "rgba(0, 255, 136, 0.4)",
            "rgba(0, 255, 136, 0.3)",
            "rgba(0, 255, 136, 0.2)",
          ],
          borderColor: "#00FF88",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#999",
            padding: 15,
          },
        },
        tooltip: {
          backgroundColor: "#1a1a1a",
          titleColor: "#00FF88",
          bodyColor: "#FFFFFF",
          borderColor: "#00FF88",
          borderWidth: 1,
          padding: 12,
        },
      },
      scales: {
        r: {
          ticks: {
            color: "#999",
            backdropColor: "transparent",
          },
          grid: {
            color: "#2a2a2a",
          },
        },
      },
    },
  });
}

// ========================================
// CARGAR EJERCICIOS PARA GRÁFICO DE FUERZA
// ========================================

async function loadExercisesForStrengthChart() {
  const filteredWorkouts = filterWorkoutsByPeriod();
  const exercisesSet = new Set();

  filteredWorkouts.forEach((workout) => {
    if (workout.exercises) {
      workout.exercises.forEach((exercise) => {
        if (exercise.name) {
          exercisesSet.add(exercise.name);
        }
      });
    }
  });

  const select = document.getElementById("exercise-select");
  select.innerHTML = '<option value="">Selecciona un ejercicio</option>';

  Array.from(exercisesSet)
    .sort()
    .forEach((exercise) => {
      const option = document.createElement("option");
      option.value = exercise;
      option.textContent = exercise;
      select.appendChild(option);
    });

  // Event listener
  select.addEventListener("change", (e) => {
    if (e.target.value) {
      generateStrengthChart(e.target.value);
    }
  });

  // Seleccionar primer ejercicio por defecto
  if (exercisesSet.size > 0) {
    const firstExercise = Array.from(exercisesSet).sort()[0];
    select.value = firstExercise;
    generateStrengthChart(firstExercise);
  }
}

// ========================================
// GRÁFICO: PROGRESIÓN DE FUERZA
// ========================================

function generateStrengthChart(exerciseName) {
  const filteredWorkouts = filterWorkoutsByPeriod();

  const progressionData = [];

  filteredWorkouts.forEach((workout) => {
    if (workout.exercises) {
      workout.exercises.forEach((exercise) => {
        if (exercise.name === exerciseName && exercise.weight) {
          const date =
            workout.startTime?.toDate() || new Date(workout.startTime);
          progressionData.push({
            date: date,
            weight: exercise.weight,
            reps: exercise.reps || 0,
          });
        }
      });
    }
  });

  // Ordenar por fecha
  progressionData.sort((a, b) => a.date - b.date);

  // Preparar datos
  const labels = progressionData.map((d) =>
    d.date.toLocaleDateString("es-AR", { day: "2-digit", month: "short" })
  );
  const weights = progressionData.map((d) => d.weight);

  // Calcular mejora
  let improvement = 0;
  if (weights.length > 1) {
    improvement = (
      ((weights[weights.length - 1] - weights[0]) / weights[0]) *
      100
    ).toFixed(1);
  }

  // Destruir gráfico anterior
  if (charts.strength) {
    charts.strength.destroy();
  }

  // Crear gráfico
  const ctx = document.getElementById("strength-chart");
  charts.strength = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Peso (kg)",
          data: weights,
          borderColor: "#00FF88",
          backgroundColor: "rgba(0, 255, 136, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: "#00FF88",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#1a1a1a",
          titleColor: "#00FF88",
          bodyColor: "#FFFFFF",
          borderColor: "#00FF88",
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            afterBody: () =>
              improvement !== 0
                ? `Mejora: ${improvement > 0 ? "+" : ""}${improvement}%`
                : "",
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            color: "#999",
            callback: (value) => value + " kg",
          },
          grid: {
            color: "#2a2a2a",
          },
        },
        x: {
          ticks: {
            color: "#999",
            maxRotation: 45,
            minRotation: 45,
          },
          grid: {
            color: "#2a2a2a",
          },
        },
      },
    },
  });
}

// ========================================
// GENERAR INSIGHTS
// ========================================

function generateInsights() {
  const filteredWorkouts = filterWorkoutsByPeriod();
  const insights = [];

  if (filteredWorkouts.length === 0) {
    insights.push({
      icon: "📭",
      text: "No hay entrenamientos registrados en este período.",
    });
  } else {
    // Insight 1: Frecuencia
    const avgPerWeek = (filteredWorkouts.length / (currentPeriod / 7)).toFixed(
      1
    );
    if (avgPerWeek >= 4) {
      insights.push({
        icon: "🔥",
        text: `¡Increíble! Estás entrenando <strong>${avgPerWeek} veces por semana</strong> en promedio. ¡Sigue así!`,
      });
    } else if (avgPerWeek >= 2) {
      insights.push({
        icon: "💪",
        text: `Entrenas <strong>${avgPerWeek} veces por semana</strong>. ¡Buen ritmo! Considera agregar una sesión más.`,
      });
    } else {
      insights.push({
        icon: "📈",
        text: `Entrenas <strong>${avgPerWeek} veces por semana</strong>. Intenta aumentar la frecuencia para mejores resultados.`,
      });
    }

    // Insight 2: Volumen
    let totalVolume = 0;
    filteredWorkouts.forEach((w) => (totalVolume += w.totalVolume || 0));
    if (totalVolume > 50000) {
      insights.push({
        icon: "⚡",
        text: `Has levantado <strong>${(totalVolume / 1000).toFixed(
          1
        )} toneladas</strong> en este período. ¡Eres una máquina!`,
      });
    }

    // Insight 3: Mejor ejercicio
    const exerciseVolumes = {};
    filteredWorkouts.forEach((workout) => {
      if (workout.exercises) {
        workout.exercises.forEach((exercise) => {
          if (!exerciseVolumes[exercise.name]) {
            exerciseVolumes[exercise.name] = 0;
          }
          exerciseVolumes[exercise.name] +=
            (exercise.sets || 0) *
            (exercise.reps || 0) *
            (exercise.weight || 0);
        });
      }
    });

    const topExercise = Object.entries(exerciseVolumes).sort(
      (a, b) => b[1] - a[1]
    )[0];
    if (topExercise) {
      insights.push({
        icon: "🎯",
        text: `Tu ejercicio más trabajado es <strong>${
          topExercise[0]
        }</strong> con ${(topExercise[1] / 1000).toFixed(1)} toneladas.`,
      });
    }

    // Insight 4: Consistencia
    const streak = calculateBestStreak(filteredWorkouts);
    if (streak >= 7) {
      insights.push({
        icon: "🏆",
        text: `Tu mejor racha fue de <strong>${streak} días consecutivos</strong>. ¡La consistencia es clave!`,
      });
    }
  }

  // Renderizar insights
  const container = document.getElementById("insights-grid");
  container.innerHTML = "";

  insights.forEach((insight) => {
    const card = document.createElement("div");
    card.className = "insight-card";
    card.innerHTML = `
            <div class="insight-icon">${insight.icon}</div>
            <p>${insight.text}</p>
        `;
    container.appendChild(card);
  });
}

// ========================================
// GENERAR HEATMAP
// ========================================

function generateHeatmap() {
  const container = document.getElementById("heatmap-container");

  // Calcular últimas 52 semanas
  const today = new Date();
  const weeksAgo52 = new Date(today.getTime() - 52 * 7 * 24 * 60 * 60 * 1000);

  // Contar entrenamientos por día
  const workoutsByDay = {};

  allWorkouts.forEach((workout) => {
    const date = workout.startTime?.toDate() || new Date(workout.startTime);
    if (date >= weeksAgo52) {
      const dateKey = date.toISOString().split("T")[0];
      if (!workoutsByDay[dateKey]) {
        workoutsByDay[dateKey] = 0;
      }
      workoutsByDay[dateKey]++;
    }
  });

  // Generar grid
  const grid = document.createElement("div");
  grid.className = "heatmap-grid";

  for (let i = 0; i < 365; i++) {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const dateKey = date.toISOString().split("T")[0];
    const count = workoutsByDay[dateKey] || 0;

    const cell = document.createElement("div");
    cell.className = `heatmap-cell level-${Math.min(count, 4)}`;
    cell.setAttribute(
      "data-tooltip",
      `${date.toLocaleDateString("es-AR")}: ${count} entrenamientos`
    );

    grid.appendChild(cell);
  }

  // Leyenda
  const legend = document.createElement("div");
  legend.className = "heatmap-legend";
  legend.innerHTML = `
        <span>Menos</span>
        <div class="legend-item level-0"></div>
        <div class="legend-item level-1"></div>
        <div class="legend-item level-2"></div>
        <div class="legend-item level-3"></div>
        <div class="legend-item level-4"></div>
        <span>Más</span>
    `;

  container.innerHTML = "";
  container.appendChild(grid);
  container.appendChild(legend);
}

// ========================================
// CARGAR PRs
// ========================================

async function loadPRs() {
  try {
    const progressRef = collection(db, "progress");
    const q = query(
      progressRef,
      where("userId", "==", currentUserId),
      orderBy("weight", "desc")
    );

    const snapshot = await getDocs(q);
    const prs = [];

    snapshot.forEach((doc) => {
      prs.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Mostrar top 5
    const container = document.getElementById("prs-list");
    container.innerHTML = "";

    if (prs.length === 0) {
      container.innerHTML =
        '<p style="text-align: center; color: #999;">No hay PRs registrados aún</p>';
      return;
    }

    prs.slice(0, 5).forEach((pr) => {
      const date = pr.fecha?.toDate() || new Date(pr.fecha);
      const item = document.createElement("div");
      item.className = "pr-item";
      item.innerHTML = `
                <div class="pr-info">
                    <div class="pr-exercise">${
                      pr.ejercicio || "Ejercicio"
                    }</div>
                    <div class="pr-date">${date.toLocaleDateString(
                      "es-AR"
                    )}</div>
                </div>
                <div class="pr-value">${pr.weight || pr.peso || 0} kg</div>
            `;
      container.appendChild(item);
    });
  } catch (error) {
    console.error("❌ Error al cargar PRs:", error);
  }
}

// ========================================
// HELPERS
// ========================================

function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

function showLoading(show) {
  const overlay = document.getElementById("loading-overlay");
  if (show) {
    overlay.classList.add("active");
  } else {
    overlay.classList.remove("active");
  }
}

// ========================================
// SELECTOR DE PERÍODO
// ========================================

function initializePeriodSelector() {
  const buttons = document.querySelectorAll(".period-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      // Remover active
      buttons.forEach((b) => b.classList.remove("active"));

      // Activar seleccionado
      btn.classList.add("active");

      // Actualizar período
      currentPeriod = btn.dataset.period;

      // Recargar analytics
      await loadAnalytics();
    });
  });
}

console.log("✅ analytics.js cargado");
