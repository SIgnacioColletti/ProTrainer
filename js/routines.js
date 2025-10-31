// ============================================
// ARCHIVO: js/routines.js
// ============================================

import { auth, db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ============================================
// VARIABLES GLOBALES
// ============================================

let routines = [];
let editingRoutineId = null;
let currentExercises = [];

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("💪 Rutinas cargadas");

  // Verificar autenticación
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "auth.html";
      return;
    }

    console.log("👤 Usuario autenticado:", user.email);
    loadRoutines();
    checkForSelectedExercise();
  });

  // Event Listeners
  document.getElementById("btnBack")?.addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });

  document.getElementById("btnOpenLibrary")?.addEventListener("click", () => {
    window.location.href = "exercises.html";
  });

  document
    .getElementById("btnCreateRoutine")
    ?.addEventListener("click", openAddRoutineModal);
  document
    .getElementById("btnCloseModal")
    ?.addEventListener("click", closeRoutineModal);
  document
    .getElementById("btnCancel")
    ?.addEventListener("click", closeRoutineModal);
  document
    .getElementById("routineForm")
    ?.addEventListener("submit", saveRoutine);

  // Modal de ejercicio
  document
    .getElementById("btnAddExercise")
    ?.addEventListener("click", openExerciseModal);
  document
    .getElementById("btnCloseExerciseModal")
    ?.addEventListener("click", closeExerciseModal);
  document
    .getElementById("btnCancelExercise")
    ?.addEventListener("click", closeExerciseModal);
  document
    .getElementById("exerciseForm")
    ?.addEventListener("submit", addExerciseToRoutine);
  document.getElementById("btnAddSet")?.addEventListener("click", addSet);
  document.getElementById("btnTemplates")?.addEventListener("click", () => {
    window.location.href = "templates.html";
  });
});

// ============================================
// CARGAR RUTINAS DESDE FIRESTORE
// ============================================

async function loadRoutines() {
  const loadingEl = document.getElementById("loading");
  const listEl = document.getElementById("routinesList");

  if (!loadingEl || !listEl) {
    console.error("❌ Elementos del DOM no encontrados");
    return;
  }

  loadingEl.style.display = "flex";
  listEl.innerHTML = "";

  try {
    const routinesRef = collection(db, "routines");
    const q = query(routinesRef, where("userId", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);

    routines = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    loadingEl.style.display = "none";
    renderRoutines();

    console.log(`✅ ${routines.length} rutinas cargadas`);
  } catch (error) {
    console.error("❌ Error cargando rutinas:", error);
    loadingEl.style.display = "none";
    showToast("Error al cargar las rutinas");
  }
}

// ============================================
// RENDERIZAR RUTINAS
// ============================================

function renderRoutines() {
  const routinesList = document.getElementById("routinesList");

  if (!routinesList) {
    console.error("❌ Elemento routinesList no encontrado");
    return;
  }

  routinesList.innerHTML = "";

  if (routines.length === 0) {
    routinesList.innerHTML = `
            <div class="empty-state">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="12" y1="8" x2="12" y2="16"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                <p>No tienes rutinas guardadas</p>
                <button class="btn-primary" id="btnFirstRoutine">Crear mi primera rutina</button>
            </div>
        `;

    document
      .getElementById("btnFirstRoutine")
      ?.addEventListener("click", openAddRoutineModal);
    return;
  }

  routines.forEach((routine) => {
    const routineCard = document.createElement("div");
    routineCard.className = "routine-card";

    const totalExercises = routine.exercises ? routine.exercises.length : 0;
    const estimatedTime = totalExercises * 5;

    routineCard.innerHTML = `
            <div class="routine-header">
                <h3 class="routine-name">${
                  routine.name || "Rutina sin nombre"
                }</h3>
                <div class="routine-actions">
                    <button class="btn-icon btn-edit" data-id="${routine.id}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn-icon btn-delete" data-id="${routine.id}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="routine-info">
                <span class="info-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <line x1="9" y1="9" x2="15" y2="9"/>
                        <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                    ${totalExercises} ejercicios
                </span>
                <span class="info-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    ~${estimatedTime} min
                </span>
            </div>
            
            <div class="exercises-preview">
                ${
                  routine.exercises && routine.exercises.length > 0
                    ? routine.exercises
                        .slice(0, 3)
                        .map(
                          (ex) => `
                        <div class="exercise-preview-item">
                            <span class="exercise-name">${ex.name}</span>
                            <span class="exercise-sets">${
                              ex.sets ? ex.sets.length : 3
                            }x${
                            ex.sets && ex.sets[0] ? ex.sets[0].reps : 12
                          }</span>
                        </div>
                    `
                        )
                        .join("")
                    : '<p class="no-exercises">Sin ejercicios</p>'
                }
                ${
                  routine.exercises && routine.exercises.length > 3
                    ? `<span class="more-exercises">+${
                        routine.exercises.length - 3
                      } más...</span>`
                    : ""
                }
            </div>
            
            <button class="btn-start-workout" data-id="${routine.id}">
                💪 Iniciar Entrenamiento
            </button>
        `;

    routinesList.appendChild(routineCard);
  });

  attachRoutineEventListeners();
}

// ============================================
// AGREGAR EVENT LISTENERS
// ============================================

function attachRoutineEventListeners() {
  document.querySelectorAll(".btn-edit").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      editRoutine(btn.dataset.id);
    });
  });

  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteRoutine(btn.dataset.id);
    });
  });

  document.querySelectorAll(".btn-start-workout").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      startWorkout(btn.dataset.id);
    });
  });
}

// ============================================
// MODALES
// ============================================

function openAddRoutineModal() {
  editingRoutineId = null;
  currentExercises = [];

  document.getElementById("modalTitle").textContent = "Crear Nueva Rutina";
  document.getElementById("routineName").value = "";
  document.getElementById("exercisesContainer").innerHTML =
    '<p class="no-exercises">No hay ejercicios. Haz click en "Agregar Ejercicio"</p>';

  document.getElementById("routineModal").classList.add("active");
}

function closeRoutineModal() {
  document.getElementById("routineModal").classList.remove("active");
}

function openExerciseModal() {
  document.getElementById("exerciseName").value = "";
  document.getElementById("exerciseCategory").value = "pecho";

  const setsContainer = document.getElementById("setsContainer");
  setsContainer.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    addSet();
  }

  document.getElementById("exerciseModal").classList.add("active");
}

function closeExerciseModal() {
  document.getElementById("exerciseModal").classList.remove("active");
}

function addSet() {
  const container = document.getElementById("setsContainer");
  const setNumber = container.children.length + 1;

  const setItem = document.createElement("div");
  setItem.className = "set-item";
  setItem.innerHTML = `
        <span class="set-label">Serie ${setNumber}</span>
        <input type="number" placeholder="Peso (kg)" min="0" step="0.5" value="0" required>
        <input type="number" placeholder="Reps" min="1" value="12" required>
        <button type="button" class="btn-remove-set" onclick="this.parentElement.remove()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;

  container.appendChild(setItem);
}

function addExerciseToRoutine(e) {
  e.preventDefault();

  const name = document.getElementById("exerciseName").value;
  const category = document.getElementById("exerciseCategory").value;

  const setsContainer = document.getElementById("setsContainer");
  const sets = Array.from(setsContainer.querySelectorAll(".set-item")).map(
    (item) => {
      const inputs = item.querySelectorAll("input");
      return {
        weight: parseFloat(inputs[0].value) || 0,
        reps: parseInt(inputs[1].value) || 12,
      };
    }
  );

  currentExercises.push({
    name,
    category,
    sets,
  });

  renderExercisesInRoutine();
  closeExerciseModal();
  showToast(`✅ ${name} agregado`);
}

function renderExercisesInRoutine() {
  const container = document.getElementById("exercisesContainer");

  if (currentExercises.length === 0) {
    container.innerHTML =
      '<p class="no-exercises">No hay ejercicios. Haz click en "Agregar Ejercicio"</p>';
    return;
  }

  container.innerHTML = currentExercises
    .map(
      (exercise, index) => `
        <div class="exercise-item">
            <div class="exercise-item-info">
                <h4>${exercise.name}</h4>
                <p>${exercise.sets.length} series - ${exercise.category}</p>
            </div>
            <button type="button" class="btn-remove-exercise" onclick="removeExercise(${index})">Eliminar</button>
        </div>
    `
    )
    .join("");
}

window.removeExercise = function (index) {
  currentExercises.splice(index, 1);
  renderExercisesInRoutine();
  showToast("Ejercicio eliminado");
};

// ============================================
// GUARDAR RUTINA (CORREGIDO)
// ============================================

async function saveRoutine(e) {
  e.preventDefault();

  const name = document.getElementById("routineName").value.trim();

  if (!name) {
    showToast("❌ Ingresa un nombre para la rutina");
    return;
  }

  if (currentExercises.length === 0) {
    showToast("❌ Agrega al menos un ejercicio");
    return;
  }

  if (!auth.currentUser) {
    showToast("❌ Debes estar autenticado");
    return;
  }

  const routineData = {
    name: name,
    exercises: currentExercises,
    userId: auth.currentUser.uid,
    createdAt: serverTimestamp(),
  };

  try {
    if (editingRoutineId) {
      const routineRef = doc(db, "routines", editingRoutineId);
      await updateDoc(routineRef, {
        name: routineData.name,
        exercises: routineData.exercises,
      });
      showToast("✅ Rutina actualizada");
      console.log("✅ Rutina actualizada:", editingRoutineId);
    } else {
      const routinesCollection = collection(db, "routines");
      const docRef = await addDoc(routinesCollection, routineData);
      showToast("✅ Rutina creada");
      console.log("✅ Rutina creada con ID:", docRef.id);
    }

    closeRoutineModal();
    await loadRoutines();
  } catch (error) {
    console.error("❌ Error guardando rutina:", error);
    console.error("Detalles:", error.message);
    showToast("Error: " + error.message);
  }
}

// ============================================
// EDITAR Y ELIMINAR
// ============================================

function editRoutine(routineId) {
  const routine = routines.find((r) => r.id === routineId);
  if (!routine) return;

  editingRoutineId = routineId;
  currentExercises = [...routine.exercises];

  document.getElementById("modalTitle").textContent = "Editar Rutina";
  document.getElementById("routineName").value = routine.name;

  renderExercisesInRoutine();
  document.getElementById("routineModal").classList.add("active");
}

async function deleteRoutine(routineId) {
  const routine = routines.find((r) => r.id === routineId);
  if (!routine) return;

  const confirmar = confirm(`¿Eliminar la rutina "${routine.name}"?`);
  if (!confirmar) return;

  try {
    await deleteDoc(doc(db, "routines", routineId));
    showToast("✅ Rutina eliminada");
    loadRoutines();
  } catch (error) {
    console.error("❌ Error eliminando rutina:", error);
    showToast("Error al eliminar la rutina");
  }
}

// ============================================
// INICIAR ENTRENAMIENTO
// ============================================

function startWorkout(routineId) {
  window.location.href = `workout.html?id=${routineId}`;
}

window.startWorkout = startWorkout;

// ============================================
// CHECK EJERCICIO SELECCIONADO
// ============================================

function checkForSelectedExercise() {
  const selectedExercise = localStorage.getItem("selectedExercise");
  if (selectedExercise) {
    const exercise = JSON.parse(selectedExercise);
    showToast(`✅ ${exercise.name} seleccionado`);
    localStorage.removeItem("selectedExercise");
  }
}

// ============================================
// TOAST
// ============================================

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
