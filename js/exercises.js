// ============================================
// ARCHIVO: js/exercises.js
// ============================================

import { auth, db } from "./firebaseConfig.js";
import { exercisesDatabase } from "./exercisesData.js";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ============================================
// VARIABLES GLOBALES
// ============================================

let allExercises = [];
let filteredExercises = [];
let favoriteExercises = [];
let userCustomExercises = [];
let currentFilters = {
  category: "all",
  level: "all",
  search: "",
  favoritesOnly: false,
};

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("💪 Biblioteca de Ejercicios cargada");

  // Verificar autenticación
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "auth.html";
      return;
    }

    loadUserExercises();
    loadFavorites();
  });

  // Event Listeners - Navegación
  document.getElementById("btnBack").addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });

  // Event Listener - Crear Ejercicio
  document
    .getElementById("btnAddExercise")
    .addEventListener("click", openCreateExerciseModal);
  document
    .getElementById("btnCloseCreateModal")
    .addEventListener("click", closeCreateExerciseModal);
  document
    .getElementById("btnCancelCreate")
    .addEventListener("click", closeCreateExerciseModal);
  document
    .getElementById("createExerciseForm")
    .addEventListener("submit", createCustomExercise);

  // Event Listeners - Instrucciones y Tips
  document
    .getElementById("btnAddInstruction")
    .addEventListener("click", addInstructionField);
  document.getElementById("btnAddTip").addEventListener("click", addTipField);

  // Event Listeners - Búsqueda
  document
    .getElementById("searchInput")
    .addEventListener("input", handleSearch);
  document
    .getElementById("btnClearSearch")
    .addEventListener("click", clearSearch);

  // Event Listeners - Filtros
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilters.category = btn.dataset.category;
      applyFilters();
    });
  });

  document.querySelectorAll(".level-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".level-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilters.level = btn.dataset.level;
      applyFilters();
    });
  });

  // Event Listener - Solo Favoritos
  document
    .getElementById("btnToggleFavorites")
    .addEventListener("click", toggleFavoritesFilter);

  // Event Listener - Modal
  document
    .getElementById("btnCloseModal")
    .addEventListener("click", closeModal);
});

// ============================================
// CARGAR EJERCICIOS DEL USUARIO
// ============================================

async function loadUserExercises() {
  try {
    const exercisesRef = collection(db, "customExercises");
    const q = query(exercisesRef, where("userId", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);

    userCustomExercises = snapshot.docs.map((doc) => ({
      firestoreId: doc.id,
      isCustom: true,
      ...doc.data(),
    }));

    // Combinar ejercicios predefinidos + ejercicios del usuario
    allExercises = [...exercisesDatabase, ...userCustomExercises];
    filteredExercises = [...allExercises];

    console.log(`📚 ${exercisesDatabase.length} ejercicios predefinidos`);
    console.log(`✏️ ${userCustomExercises.length} ejercicios personalizados`);
    console.log(`📊 Total: ${allExercises.length} ejercicios`);

    renderExercises();
  } catch (error) {
    console.error("❌ Error cargando ejercicios:", error);
    allExercises = [...exercisesDatabase];
    filteredExercises = [...allExercises];
    renderExercises();
  }
}

// ============================================
// CARGAR FAVORITOS DESDE FIRESTORE
// ============================================

async function loadFavorites() {
  try {
    const favoritesRef = collection(db, "favoriteExercises");
    const q = query(favoritesRef, where("userId", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);

    favoriteExercises = snapshot.docs.map((doc) => ({
      firestoreId: doc.id,
      ...doc.data(),
    }));

    console.log(`⭐ ${favoriteExercises.length} favoritos cargados`);
  } catch (error) {
    console.error("❌ Error cargando favoritos:", error);
  }
}

// ============================================
// MODAL CREAR EJERCICIO
// ============================================

function openCreateExerciseModal() {
  document.getElementById("createExerciseModal").classList.add("active");
  document.getElementById("customExerciseName").focus();
}

function closeCreateExerciseModal() {
  document.getElementById("createExerciseModal").classList.remove("active");
  document.getElementById("createExerciseForm").reset();

  // Resetear instrucciones y tips a 1 campo
  document.getElementById("instructionsContainer").innerHTML = `
        <div class="instruction-item">
            <input type="text" class="instruction-input" placeholder="Paso 1" required>
            <button type="button" class="btn-remove-instruction" style="display: none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
    `;

  document.getElementById("tipsContainer").innerHTML = `
        <div class="tip-item">
            <input type="text" class="tip-input" placeholder="Tip 1">
            <button type="button" class="btn-remove-tip" style="display: none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
    `;
}

// Agregar campo de instrucción
function addInstructionField() {
  const container = document.getElementById("instructionsContainer");
  const count = container.children.length + 1;

  const item = document.createElement("div");
  item.className = "instruction-item";
  item.innerHTML = `
        <input type="text" class="instruction-input" placeholder="Paso ${count}" required>
        <button type="button" class="btn-remove-instruction">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;

  item
    .querySelector(".btn-remove-instruction")
    .addEventListener("click", function () {
      item.remove();
      updateInstructionPlaceholders();
    });

  container.appendChild(item);
  updateRemoveButtons();
}

// Agregar campo de tip
function addTipField() {
  const container = document.getElementById("tipsContainer");
  const count = container.children.length + 1;

  const item = document.createElement("div");
  item.className = "tip-item";
  item.innerHTML = `
        <input type="text" class="tip-input" placeholder="Tip ${count}">
        <button type="button" class="btn-remove-tip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;

  item.querySelector(".btn-remove-tip").addEventListener("click", function () {
    item.remove();
    updateTipPlaceholders();
  });

  container.appendChild(item);
  updateRemoveButtons();
}

function updateInstructionPlaceholders() {
  const instructions = document.querySelectorAll(".instruction-input");
  instructions.forEach((input, index) => {
    input.placeholder = `Paso ${index + 1}`;
  });
}

function updateTipPlaceholders() {
  const tips = document.querySelectorAll(".tip-input");
  tips.forEach((input, index) => {
    input.placeholder = `Tip ${index + 1}`;
  });
}

function updateRemoveButtons() {
  // Mostrar botones de remover solo si hay más de 1
  const instructionItems = document.querySelectorAll(".instruction-item");
  instructionItems.forEach((item) => {
    const btn = item.querySelector(".btn-remove-instruction");
    btn.style.display = instructionItems.length > 1 ? "flex" : "none";
  });

  const tipItems = document.querySelectorAll(".tip-item");
  tipItems.forEach((item) => {
    const btn = item.querySelector(".btn-remove-tip");
    btn.style.display = tipItems.length > 1 ? "flex" : "none";
  });
}

// ============================================
// CREAR EJERCICIO PERSONALIZADO
// ============================================

async function createCustomExercise(e) {
  e.preventDefault();

  const name = document.getElementById("customExerciseName").value.trim();
  const category = document.getElementById("customExerciseCategory").value;
  const level = document.getElementById("customExerciseLevel").value;
  const description = document
    .getElementById("customExerciseDescription")
    .value.trim();

  // Obtener instrucciones
  const instructionInputs = document.querySelectorAll(".instruction-input");
  const instructions = Array.from(instructionInputs)
    .map((input) => input.value.trim())
    .filter((val) => val !== "");

  // Obtener tips
  const tipInputs = document.querySelectorAll(".tip-input");
  const tips = Array.from(tipInputs)
    .map((input) => input.value.trim())
    .filter((val) => val !== "");

  if (instructions.length === 0) {
    showToast("❌ Agrega al menos una instrucción");
    return;
  }

  const exerciseData = {
    id: `custom-${Date.now()}`,
    name,
    category,
    level,
    description,
    instructions,
    tips:
      tips.length > 0
        ? tips
        : ["Consulta con un profesional antes de realizar este ejercicio"],
    variants: [],
    isCustom: true,
    userId: auth.currentUser.uid,
    createdAt: serverTimestamp(),
  };

  try {
    const docRef = await addDoc(
      collection(db, "customExercises"),
      exerciseData
    );

    exerciseData.firestoreId = docRef.id;
    userCustomExercises.push(exerciseData);
    allExercises.push(exerciseData);

    showToast(`✅ ${name} creado correctamente`);
    closeCreateExerciseModal();
    applyFilters();

    console.log("✅ Ejercicio personalizado creado:", exerciseData);
  } catch (error) {
    console.error("❌ Error creando ejercicio:", error);
    showToast("Error al crear el ejercicio");
  }
}

// ============================================
// BÚSQUEDA
// ============================================

function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase().trim();
  currentFilters.search = searchTerm;

  const btnClear = document.getElementById("btnClearSearch");
  btnClear.style.display = searchTerm ? "flex" : "none";

  applyFilters();
}

function clearSearch() {
  document.getElementById("searchInput").value = "";
  document.getElementById("btnClearSearch").style.display = "none";
  currentFilters.search = "";
  applyFilters();
}

// ============================================
// FILTROS
// ============================================

function applyFilters() {
  filteredExercises = allExercises.filter((exercise) => {
    const categoryMatch =
      currentFilters.category === "all" ||
      exercise.category === currentFilters.category;

    const levelMatch =
      currentFilters.level === "all" || exercise.level === currentFilters.level;

    const searchMatch =
      currentFilters.search === "" ||
      exercise.name.toLowerCase().includes(currentFilters.search) ||
      exercise.description.toLowerCase().includes(currentFilters.search) ||
      exercise.category.toLowerCase().includes(currentFilters.search);

    const favoriteMatch =
      !currentFilters.favoritesOnly || isFavorite(exercise.id);

    return categoryMatch && levelMatch && searchMatch && favoriteMatch;
  });

  renderExercises();
}

function toggleFavoritesFilter() {
  const btn = document.getElementById("btnToggleFavorites");
  currentFilters.favoritesOnly = !currentFilters.favoritesOnly;

  if (currentFilters.favoritesOnly) {
    btn.classList.add("active");
    btn.textContent = "⭐ Mostrando favoritos";
  } else {
    btn.classList.remove("active");
    btn.textContent = "⭐ Solo favoritos";
  }

  applyFilters();
}

// ============================================
// RENDERIZAR EJERCICIOS
// ============================================

function renderExercises() {
  const container = document.getElementById("exercisesContainer");
  const resultsCount = document.getElementById("resultsCount");

  resultsCount.textContent = `${filteredExercises.length} ejercicio${
    filteredExercises.length !== 1 ? "s" : ""
  } encontrado${filteredExercises.length !== 1 ? "s" : ""}`;

  container.innerHTML = "";

  if (filteredExercises.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                </svg>
                <p>No se encontraron ejercicios</p>
            </div>
        `;
    return;
  }

  filteredExercises.forEach((exercise) => {
    const card = createExerciseCard(exercise);
    container.appendChild(card);
  });
}

function createExerciseCard(exercise) {
  const card = document.createElement("div");
  card.className = "exercise-card";

  const isFav = isFavorite(exercise.id);

  card.innerHTML = `
        <div class="exercise-card-header">
            <div class="exercise-card-title">
                <h3>
                    ${exercise.name}
                    ${
                      exercise.isCustom
                        ? '<span class="custom-badge">Personalizado</span>'
                        : ""
                    }
                </h3>
                <span class="exercise-category-badge">${
                  exercise.category
                }</span>
            </div>
            <button class="btn-favorite" data-id="${exercise.id}">
                ${isFav ? "⭐" : "☆"}
            </button>
        </div>
        
        <p class="exercise-description">${exercise.description}</p>
        
        <div class="exercise-card-footer">
            <div class="exercise-level">
                <span class="level-indicator ${exercise.level}"></span>
                <span>${capitalize(exercise.level)}</span>
            </div>
            <button class="btn-view-details" data-id="${exercise.id}">
                Ver detalles
            </button>
        </div>
    `;

  const btnFavorite = card.querySelector(".btn-favorite");
  btnFavorite.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFavorite(exercise);
  });

  const btnDetails = card.querySelector(".btn-view-details");
  btnDetails.addEventListener("click", () => {
    openExerciseModal(exercise);
  });

  return card;
}

// ============================================
// MODAL DE DETALLE
// ============================================

function openExerciseModal(exercise) {
  const modal = document.getElementById("exerciseModal");
  const modalContent = document.getElementById("modalContent");

  const isFav = isFavorite(exercise.id);

  const variantsHTML =
    exercise.variants && exercise.variants.length > 0
      ? `
        <div class="modal-section">
            <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                </svg>
                Variantes
            </h3>
            <div class="variants-grid">
                ${exercise.variants
                  .map(
                    (variant) => `
                    <div class="variant-item">
                        <h4>${variant.name}</h4>
                        <span class="badge" style="background: ${getLevelColor(
                          variant.level
                        )}; display: inline-block; margin-bottom: 0.5rem;">
                            ${capitalize(variant.level)}
                        </span>
                        <p>${variant.description}</p>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>
    `
      : "";

  modalContent.innerHTML = `
        <div class="modal-header">
            <h2>
                ${exercise.name}
                ${
                  exercise.isCustom
                    ? '<span class="custom-badge">Personalizado</span>'
                    : ""
                }
            </h2>
            <div class="modal-badges">
                <span class="badge" style="background: var(--verde-oscuro); color: var(--verde-principal);">
                    ${exercise.category.toUpperCase()}
                </span>
                <span class="badge">
                    <span class="level-indicator ${exercise.level}"></span>
                    ${capitalize(exercise.level)}
                </span>
            </div>
        </div>
        
        <div class="modal-section">
            <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                Descripción
            </h3>
            <p>${exercise.description}</p>
        </div>
        
        <div class="modal-section">
            <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 11 12 14 22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
                Instrucciones
            </h3>
            <ol class="instructions-list">
                ${exercise.instructions
                  .map(
                    (instruction, i) => `
                    <li data-step="${i + 1}">${instruction}</li>
                `
                  )
                  .join("")}
            </ol>
        </div>
        
        <div class="modal-section">
            <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                </svg>
                Tips de Seguridad
            </h3>
            <ul class="tips-list">
                ${exercise.tips.map((tip) => `<li>${tip}</li>`).join("")}
            </ul>
        </div>
        
        ${variantsHTML}
        
        <div class="modal-actions">
            <button class="btn-action btn-add-routine" data-id="${exercise.id}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Agregar a Rutina
            </button>
            <button class="btn-action btn-toggle-favorite" data-id="${
              exercise.id
            }">
                ${isFav ? "⭐ Quitar de favoritos" : "☆ Agregar a favoritos"}
            </button>
            ${
              exercise.isCustom
                ? `
                <button class="btn-action btn-delete-custom" data-id="${exercise.id}" style="background: #F44336;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Eliminar
                </button>
            `
                : ""
            }
        </div>
    `;

  modalContent
    .querySelector(".btn-add-routine")
    .addEventListener("click", () => {
      addToRoutine(exercise);
    });

  modalContent
    .querySelector(".btn-toggle-favorite")
    .addEventListener("click", () => {
      toggleFavorite(exercise);
      openExerciseModal(exercise);
    });

  if (exercise.isCustom) {
    modalContent
      .querySelector(".btn-delete-custom")
      .addEventListener("click", () => {
        deleteCustomExercise(exercise);
      });
  }

  modal.classList.add("active");
}

function closeModal() {
  document.getElementById("exerciseModal").classList.remove("active");
}

// ============================================
// ELIMINAR EJERCICIO PERSONALIZADO
// ============================================

async function deleteCustomExercise(exercise) {
  const confirmar = confirm(`¿Estás seguro de eliminar "${exercise.name}"?`);
  if (!confirmar) return;

  try {
    await deleteDoc(doc(db, "customExercises", exercise.firestoreId));

    userCustomExercises = userCustomExercises.filter(
      (ex) => ex.id !== exercise.id
    );
    allExercises = allExercises.filter((ex) => ex.id !== exercise.id);

    showToast(`✅ ${exercise.name} eliminado`);
    closeModal();
    applyFilters();

    console.log("✅ Ejercicio eliminado:", exercise.name);
  } catch (error) {
    console.error("❌ Error eliminando ejercicio:", error);
    showToast("Error al eliminar el ejercicio");
  }
}

// ============================================
// FAVORITOS
// ============================================

function isFavorite(exerciseId) {
  return favoriteExercises.some((fav) => fav.exerciseId === exerciseId);
}

async function toggleFavorite(exercise) {
  const favorite = favoriteExercises.find(
    (fav) => fav.exerciseId === exercise.id
  );

  try {
    if (favorite) {
      await deleteDoc(doc(db, "favoriteExercises", favorite.firestoreId));
      favoriteExercises = favoriteExercises.filter(
        (fav) => fav.exerciseId !== exercise.id
      );
      showToast(`☆ ${exercise.name} eliminado de favoritos`);
      console.log("☆ Favorito eliminado");
    } else {
      const docRef = await addDoc(collection(db, "favoriteExercises"), {
        userId: auth.currentUser.uid,
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        category: exercise.category,
        addedAt: new Date(),
      });

      favoriteExercises.push({
        firestoreId: docRef.id,
        userId: auth.currentUser.uid,
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        category: exercise.category,
      });

      showToast(`⭐ ${exercise.name} agregado a favoritos`);
      console.log("⭐ Favorito agregado");
    }

    renderExercises();
  } catch (error) {
    console.error("❌ Error con favorito:", error);
    showToast("Error al actualizar favoritos");
  }
}

// ============================================
// AGREGAR A RUTINA
// ============================================

function addToRoutine(exercise) {
  const exerciseData = {
    name: exercise.name,
    category: exercise.category,
    sets: [
      { weight: 0, reps: 12 },
      { weight: 0, reps: 12 },
      { weight: 0, reps: 12 },
    ],
  };

  localStorage.setItem("selectedExercise", JSON.stringify(exerciseData));

  showToast(`✅ ${exercise.name} seleccionado. Redirigiéndote a Rutinas...`);

  setTimeout(() => {
    window.location.href = "routines.html";
  }, 1500);
}

// ============================================
// UTILIDADES
// ============================================

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getLevelColor(level) {
  const colors = {
    principiante: "rgba(76, 175, 80, 0.2)",
    intermedio: "rgba(255, 193, 7, 0.2)",
    avanzado: "rgba(244, 67, 54, 0.2)",
  };
  return colors[level] || "var(--gris-medio)";
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
