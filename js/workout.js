// ============================================
// ARCHIVO: js/workout.js
// ============================================

import { auth, db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ============================================
// VARIABLES GLOBALES - WORKOUT
// ============================================

let currentRoutine = null;
let sessionStartTime = null;
let sessionInterval = null;
let workoutData = {
  exercises: [],
  completedSets: 0,
  totalVolume: 0,
};

// ============================================
// VARIABLES GLOBALES - TIMER
// ============================================

let timerInterval = null;
let timeRemaining = 60;
let timerRunning = false;

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("💪 Modo Entrenamiento iniciado");

  // Verificar autenticación
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "auth.html";
      return;
    }

    // Obtener ID de rutina desde URL
    const urlParams = new URLSearchParams(window.location.search);
    const routineId = urlParams.get("id");

    if (!routineId) {
      showToast("❌ No se seleccionó ninguna rutina");
      setTimeout(() => (window.location.href = "routines.html"), 2000);
      return;
    }

    cargarRutina(routineId);
  });

  // Event Listeners - Workout
  document.getElementById("btnBack").addEventListener("click", confirmarSalida);
  document
    .getElementById("btnFinish")
    .addEventListener("click", mostrarModalFinalizar);
  document
    .getElementById("btnTimerFloat")
    .addEventListener("click", abrirTimer);
  document
    .getElementById("btnConfirmFinish")
    .addEventListener("click", finalizarEntrenamiento);
  document
    .getElementById("btnCancelFinish")
    .addEventListener("click", cerrarModalFinalizar);

  // Event Listeners - Timer
  document
    .getElementById("btnCloseTimer")
    .addEventListener("click", cerrarTimer);
  document
    .getElementById("btnTimerPlay")
    .addEventListener("click", toggleTimer);
  document
    .getElementById("btnTimerReset")
    .addEventListener("click", resetTimer);
  document.getElementById("btnTimerAdd").addEventListener("click", addTime);
  document
    .getElementById("btnSetCustom")
    .addEventListener("click", setCustomTime);

  // Presets del timer
  document.querySelectorAll(".preset-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setPresetTime(parseInt(btn.dataset.seconds));
      document
        .querySelectorAll(".preset-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Iniciar cronómetro de sesión
  iniciarCronometroSesion();

  // Actualizar display inicial del timer
  actualizarDisplay();
});

// ============================================
// CARGAR RUTINA
// ============================================

async function cargarRutina(routineId) {
  const loadingEl = document.getElementById("loadingWorkout");
  const listEl = document.getElementById("exercisesList");

  try {
    const routineRef = doc(db, "routines", routineId);
    const routineSnap = await getDoc(routineRef);

    if (!routineSnap.exists()) {
      showToast("❌ Rutina no encontrada");
      setTimeout(() => (window.location.href = "routines.html"), 2000);
      return;
    }

    currentRoutine = { id: routineSnap.id, ...routineSnap.data() };

    // Actualizar header
    document.getElementById("routineName").textContent = currentRoutine.name;

    // Renderizar ejercicios
    renderizarEjercicios();

    loadingEl.style.display = "none";

    console.log("✅ Rutina cargada:", currentRoutine);
  } catch (error) {
    console.error("❌ Error cargando rutina:", error);
    showToast("Error al cargar la rutina");
  }
}

// ============================================
// RENDERIZAR EJERCICIOS
// ============================================

function renderizarEjercicios() {
  const listEl = document.getElementById("exercisesList");
  listEl.innerHTML = "";

  currentRoutine.exercises.forEach((exercise, exerciseIndex) => {
    const exerciseCard = document.createElement("div");
    exerciseCard.className = "exercise-card";
    exerciseCard.dataset.index = exerciseIndex;

    const setsHTML = exercise.sets
      .map(
        (set, setIndex) => `
            <div class="set-item" data-exercise="${exerciseIndex}" data-set="${setIndex}">
                <input type="checkbox" class="set-checkbox" id="check-${exerciseIndex}-${setIndex}">
                <div class="set-info">
                    <div class="set-input-group">
                        <label>Peso (kg)</label>
                        <input type="number" class="set-input" value="${
                          set.weight || 0
                        }" 
                               data-type="weight" min="0" step="0.5">
                    </div>
                    <div class="set-input-group">
                        <label>Reps</label>
                        <input type="number" class="set-input" value="${
                          set.reps || 0
                        }" 
                               data-type="reps" min="0">
                    </div>
                </div>
                <span class="set-status">⚪</span>
            </div>
        `
      )
      .join("");

    exerciseCard.innerHTML = `
            <div class="exercise-header">
                <div class="exercise-title">
                    <h3>${exercise.name}</h3>
                    <span class="exercise-category">${
                      exercise.category || "General"
                    }</span>
                </div>
                <button class="btn-timer-exercise" data-exercise="${exerciseIndex}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                </button>
            </div>
            <div class="exercise-sets">
                ${setsHTML}
            </div>
        `;

    listEl.appendChild(exerciseCard);

    // Guardar en workoutData
    workoutData.exercises.push({
      name: exercise.name,
      sets: exercise.sets.map((set) => ({
        weight: set.weight || 0,
        reps: set.reps || 0,
        completed: false,
      })),
    });
  });

  // Event listeners
  document.querySelectorAll(".set-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", marcarSerieCompletada);
  });

  document.querySelectorAll(".set-input").forEach((input) => {
    input.addEventListener("change", actualizarDatosSerie);
  });

  document.querySelectorAll(".btn-timer-exercise").forEach((btn) => {
    btn.addEventListener("click", abrirTimer);
  });
}

// ============================================
// MARCAR SERIE COMPLETADA
// ============================================

function marcarSerieCompletada(e) {
  const checkbox = e.target;
  const setItem = checkbox.closest(".set-item");
  const exerciseIndex = parseInt(setItem.dataset.exercise);
  const setIndex = parseInt(setItem.dataset.set);
  const statusIcon = setItem.querySelector(".set-status");

  if (checkbox.checked) {
    statusIcon.textContent = "✅";
    workoutData.exercises[exerciseIndex].sets[setIndex].completed = true;
    workoutData.completedSets++;

    const weight =
      parseFloat(setItem.querySelector('[data-type="weight"]').value) || 0;
    const reps =
      parseInt(setItem.querySelector('[data-type="reps"]').value) || 0;
    workoutData.totalVolume += weight * reps;

    verificarEjercicioCompletado(exerciseIndex);
  } else {
    statusIcon.textContent = "⚪";
    workoutData.exercises[exerciseIndex].sets[setIndex].completed = false;
    workoutData.completedSets--;

    const weight =
      parseFloat(setItem.querySelector('[data-type="weight"]').value) || 0;
    const reps =
      parseInt(setItem.querySelector('[data-type="reps"]').value) || 0;
    workoutData.totalVolume -= weight * reps;
  }

  console.log("📊 Progreso:", workoutData);
}

function actualizarDatosSerie(e) {
  const input = e.target;
  const setItem = input.closest(".set-item");
  const exerciseIndex = parseInt(setItem.dataset.exercise);
  const setIndex = parseInt(setItem.dataset.set);
  const type = input.dataset.type;
  const value =
    type === "weight"
      ? parseFloat(input.value) || 0
      : parseInt(input.value) || 0;

  workoutData.exercises[exerciseIndex].sets[setIndex][type] = value;

  const checkbox = setItem.querySelector(".set-checkbox");
  if (checkbox.checked) {
    recalcularVolumenTotal();
  }
}

function recalcularVolumenTotal() {
  workoutData.totalVolume = 0;
  workoutData.exercises.forEach((exercise) => {
    exercise.sets.forEach((set) => {
      if (set.completed) {
        workoutData.totalVolume += set.weight * set.reps;
      }
    });
  });
}

function verificarEjercicioCompletado(exerciseIndex) {
  const exercise = workoutData.exercises[exerciseIndex];
  const todasCompletadas = exercise.sets.every((set) => set.completed);

  if (todasCompletadas) {
    const card = document.querySelector(
      `.exercise-card[data-index="${exerciseIndex}"]`
    );
    card.classList.add("completed");
    showToast(`✅ ${exercise.name} completado!`);
  } else {
    const card = document.querySelector(
      `.exercise-card[data-index="${exerciseIndex}"]`
    );
    card.classList.remove("completed");
  }
}

// ============================================
// CRONÓMETRO DE SESIÓN
// ============================================

function iniciarCronometroSesion() {
  sessionStartTime = Date.now();

  sessionInterval = setInterval(() => {
    const elapsed = Date.now() - sessionStartTime;
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);

    document.getElementById("sessionTimer").textContent = `${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}

// ============================================
// MODAL FINALIZAR
// ============================================

function mostrarModalFinalizar() {
  const modal = document.getElementById("finishModal");

  const duration = Date.now() - sessionStartTime;
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);

  document.getElementById("totalDuration").textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
  document.getElementById("totalExercises").textContent =
    currentRoutine.exercises.length;
  document.getElementById(
    "totalVolume"
  ).textContent = `${workoutData.totalVolume.toLocaleString()} kg`;

  modal.classList.add("active");
}

function cerrarModalFinalizar() {
  document.getElementById("finishModal").classList.remove("active");
}

async function finalizarEntrenamiento() {
  const notes = document.getElementById("workoutNotes").value;

  try {
    clearInterval(sessionInterval);

    const workoutRef = collection(db, "workouts");
    await addDoc(workoutRef, {
      userId: auth.currentUser.uid,
      routineId: currentRoutine.id,
      routineName: currentRoutine.name,
      exercises: workoutData.exercises,
      completedSets: workoutData.completedSets,
      totalVolume: workoutData.totalVolume,
      startTime: new Date(sessionStartTime),
      endTime: serverTimestamp(),
      duration: Date.now() - sessionStartTime,
      notes: notes || "",
      createdAt: serverTimestamp(),
    });

    console.log("✅ Entrenamiento guardado");
    showToast("🎉 ¡Entrenamiento guardado!");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 2000);
  } catch (error) {
    console.error("❌ Error guardando entrenamiento:", error);
    showToast("Error al guardar el entrenamiento");
  }
}

function confirmarSalida() {
  if (workoutData.completedSets > 0) {
    const confirmar = confirm(
      "¿Estás seguro que quieres salir? Se perderá el progreso no guardado."
    );
    if (!confirmar) return;
  }

  clearInterval(sessionInterval);
  window.location.href = "routines.html";
}

// ============================================
// FUNCIONES DEL TIMER
// ============================================

function abrirTimer() {
  const modal = document.getElementById("timerModal");
  modal.classList.add("active");
  console.log("⏱️ Timer abierto");
}

function cerrarTimer() {
  const modal = document.getElementById("timerModal");
  modal.classList.remove("active");

  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById("btnTimerPlay").classList.remove("paused");
  }
}

function toggleTimer() {
  const btn = document.getElementById("btnTimerPlay");

  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    btn.classList.remove("paused");
    console.log("⏸️ Timer pausado");
  } else {
    if (timeRemaining <= 0) {
      timeRemaining = 60;
      actualizarDisplay();
    }

    timerInterval = setInterval(() => {
      timeRemaining--;
      actualizarDisplay();

      if (timeRemaining <= 0) {
        finalizarTimer();
      }
    }, 1000);

    timerRunning = true;
    btn.classList.add("paused");
    console.log("▶️ Timer iniciado");
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;

  const activePreset = document.querySelector(".preset-btn.active");
  timeRemaining = activePreset ? parseInt(activePreset.dataset.seconds) : 60;

  actualizarDisplay();
  document.getElementById("btnTimerPlay").classList.remove("paused");

  console.log("🔄 Timer reseteado");
}

function addTime() {
  timeRemaining += 30;
  actualizarDisplay();
  console.log("➕ +30 segundos");
}

function setPresetTime(seconds) {
  clearInterval(timerInterval);
  timerRunning = false;
  timeRemaining = seconds;
  actualizarDisplay();
  document.getElementById("btnTimerPlay").classList.remove("paused");

  console.log(`⏱️ Timer: ${seconds}s`);
}

function setCustomTime() {
  const minutes = parseInt(document.getElementById("customMinutes").value) || 0;
  const seconds = parseInt(document.getElementById("customSeconds").value) || 0;

  if (minutes === 0 && seconds === 0) {
    alert("Por favor ingresa un tiempo válido");
    return;
  }

  clearInterval(timerInterval);
  timerRunning = false;
  timeRemaining = minutes * 60 + seconds;
  actualizarDisplay();
  document.getElementById("btnTimerPlay").classList.remove("paused");

  document.getElementById("customMinutes").value = "";
  document.getElementById("customSeconds").value = "";

  console.log(`⏱️ Custom: ${minutes}m ${seconds}s`);
}

function actualizarDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  document.getElementById("timerDisplay").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function finalizarTimer() {
  clearInterval(timerInterval);
  timerRunning = false;

  console.log("⏰ Timer finalizado!");

  const sound = document.getElementById("timerSound");
  sound.play().catch((e) => console.log("🔇 Sin sonido"));

  if ("vibrate" in navigator) {
    navigator.vibrate([200, 100, 200]);
  }

  document.getElementById("timerDisplay").style.color = "#FF0044";
  setTimeout(() => {
    document.getElementById("timerDisplay").style.color =
      "var(--verde-principal)";
  }, 1000);

  showToast("⏰ ¡Tiempo completado!");

  setTimeout(() => {
    resetTimer();
  }, 1500);

  document.getElementById("btnTimerPlay").classList.remove("paused");
}

// ============================================
// TOAST
// ============================================

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
// ============================================
