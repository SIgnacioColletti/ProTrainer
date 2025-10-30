/**
 * ========================================
 * PROTRAINER - ROUTINES MANAGEMENT
 * ========================================
 * CRUD completo de rutinas con Firestore
 */

import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * ========================================
 * VARIABLES GLOBALES
 * ========================================
 */
let currentUser = null;
let editingRoutineId = null;
let deletingRoutineId = null;

/**
 * ========================================
 * INICIALIZACIÓN
 * ========================================
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("💪 Módulo de rutinas cargado");

  // Verificar autenticación
  checkAuth();

  // Inicializar eventos
  initRoutinesListeners();
});

/**
 * ========================================
 * VERIFICAR AUTENTICACIÓN
 * ========================================
 */
function checkAuth() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user;
      console.log("✅ Usuario autenticado:", user.email);
      loadRoutines();
    } else {
      console.log("❌ Usuario no autenticado, redirigiendo...");
      window.location.href = "../index.html";
    }
  });
}

/**
 * ========================================
 * CARGAR RUTINAS
 * ========================================
 */
async function loadRoutines() {
  const loadingState = document.getElementById("loadingState");
  const emptyState = document.getElementById("emptyState");
  const routinesList = document.getElementById("routinesList");

  try {
    // Mostrar estado de carga
    loadingState.classList.remove("hidden");
    emptyState.classList.add("hidden");
    routinesList.classList.add("hidden");

    // Query a Firestore
    const routinesRef = collection(db, "routines");
    const q = query(
      routinesRef,
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    // Ocultar loading
    loadingState.classList.add("hidden");

    if (querySnapshot.empty) {
      // No hay rutinas
      emptyState.classList.remove("hidden");
    } else {
      // Renderizar rutinas
      routinesList.classList.remove("hidden");
      routinesList.innerHTML = "";

      querySnapshot.forEach((doc) => {
        const routine = { id: doc.id, ...doc.data() };
        renderRoutine(routine);
      });
    }
  } catch (error) {
    console.error("❌ Error al cargar rutinas:", error);
    loadingState.classList.add("hidden");
    showToast("Error al cargar rutinas", "error");
  }
}

/**
 * ========================================
 * RENDERIZAR RUTINA
 * ========================================
 */
function renderRoutine(routine) {
  const routinesList = document.getElementById("routinesList");

  const routineCard = document.createElement("div");
  routineCard.className = "routine-card";
  routineCard.innerHTML = `
        <div class="routine-header">
            <h3 class="routine-name">${routine.exercise}</h3>
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
        <div class="routine-details">
            <div class="routine-detail">
                <span class="detail-label">Series</span>
                <span class="detail-value">${routine.series}</span>
            </div>
            <div class="routine-detail">
                <span class="detail-label">Reps</span>
                <span class="detail-value">${routine.reps}</span>
            </div>
            <div class="routine-detail">
                <span class="detail-label">Peso</span>
                <span class="detail-value">${routine.weight} kg</span>
            </div>
        </div>
    `;

  routinesList.appendChild(routineCard);

  // Event listeners para botones
  routineCard
    .querySelector(".btn-edit")
    .addEventListener("click", () => openEditModal(routine));
  routineCard
    .querySelector(".btn-delete")
    .addEventListener("click", () => openDeleteModal(routine.id));
}

/**
 * ========================================
 * EVENT LISTENERS
 * ========================================
 */
function initRoutinesListeners() {
  // Botón volver
  const btnBack = document.getElementById("btnBack");
  if (btnBack) {
    btnBack.addEventListener("click", () => {
      window.location.href = "dashboard.html";
    });
  }

  // Botones para abrir modal de crear
  const btnAddRoutine = document.getElementById("btnAddRoutine");
  const btnAddRoutineEmpty = document.getElementById("btnAddRoutineEmpty");

  if (btnAddRoutine) {
    btnAddRoutine.addEventListener("click", openCreateModal);
  }

  if (btnAddRoutineEmpty) {
    btnAddRoutineEmpty.addEventListener("click", openCreateModal);
  }

  // Botones del modal de rutina
  const btnCloseModal = document.getElementById("btnCloseModal");
  const btnCancelModal = document.getElementById("btnCancelModal");
  const routineForm = document.getElementById("routineForm");

  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", closeRoutineModal);
  }

  if (btnCancelModal) {
    btnCancelModal.addEventListener("click", closeRoutineModal);
  }

  if (routineForm) {
    routineForm.addEventListener("submit", handleSubmitRoutine);
  }

  // Botones del modal de eliminación
  const btnCancelDelete = document.getElementById("btnCancelDelete");
  const btnConfirmDelete = document.getElementById("btnConfirmDelete");

  if (btnCancelDelete) {
    btnCancelDelete.addEventListener("click", closeDeleteModal);
  }

  if (btnConfirmDelete) {
    btnConfirmDelete.addEventListener("click", handleDeleteRoutine);
  }
}

/**
 * ========================================
 * ABRIR MODAL PARA CREAR
 * ========================================
 */
function openCreateModal() {
  const modal = document.getElementById("routineModal");
  const modalTitle = document.getElementById("modalTitle");
  const form = document.getElementById("routineForm");

  editingRoutineId = null;
  modalTitle.textContent = "Nueva Rutina";
  form.reset();
  modal.classList.remove("hidden");
}

/**
 * ========================================
 * ABRIR MODAL PARA EDITAR
 * ========================================
 */
function openEditModal(routine) {
  const modal = document.getElementById("routineModal");
  const modalTitle = document.getElementById("modalTitle");

  editingRoutineId = routine.id;
  modalTitle.textContent = "Editar Rutina";

  // Llenar formulario con datos actuales
  document.getElementById("exercise").value = routine.exercise;
  document.getElementById("series").value = routine.series;
  document.getElementById("reps").value = routine.reps;
  document.getElementById("weight").value = routine.weight;

  modal.classList.remove("hidden");
}

/**
 * ========================================
 * CERRAR MODAL DE RUTINA
 * ========================================
 */
function closeRoutineModal() {
  const modal = document.getElementById("routineModal");
  const form = document.getElementById("routineForm");

  modal.classList.add("hidden");
  form.reset();
  editingRoutineId = null;
}

/**
 * ========================================
 * MANEJAR SUBMIT DEL FORMULARIO
 * ========================================
 */
async function handleSubmitRoutine(e) {
  e.preventDefault();

  // Obtener valores
  const exercise = document.getElementById("exercise").value.trim();
  const series = parseInt(document.getElementById("series").value);
  const reps = parseInt(document.getElementById("reps").value);
  const weight = parseFloat(document.getElementById("weight").value);

  // Validaciones
  if (!exercise || series < 1 || reps < 1 || weight < 0) {
    showToast("Por favor completá todos los campos correctamente", "error");
    return;
  }

  // Deshabilitar botón
  const btnSubmit = document.getElementById("btnSubmitRoutine");
  btnSubmit.disabled = true;
  btnSubmit.textContent = "Guardando...";

  try {
    if (editingRoutineId) {
      // Actualizar rutina existente
      const routineRef = doc(db, "routines", editingRoutineId);
      await updateDoc(routineRef, {
        exercise,
        series,
        reps,
        weight,
        updatedAt: serverTimestamp(),
      });
      showToast("Rutina actualizada correctamente", "success");
    } else {
      // Crear nueva rutina
      await addDoc(collection(db, "routines"), {
        userId: currentUser.uid,
        exercise,
        series,
        reps,
        weight,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      showToast("Rutina creada correctamente", "success");
    }

    closeRoutineModal();
    loadRoutines();
  } catch (error) {
    console.error("❌ Error al guardar rutina:", error);
    showToast("Error al guardar rutina", "error");
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.textContent = "Guardar";
  }
}

/**
 * ========================================
 * ABRIR MODAL DE CONFIRMACIÓN DE ELIMINAR
 * ========================================
 */
function openDeleteModal(routineId) {
  deletingRoutineId = routineId;
  const deleteModal = document.getElementById("deleteModal");
  deleteModal.classList.remove("hidden");
}

/**
 * ========================================
 * CERRAR MODAL DE ELIMINAR
 * ========================================
 */
function closeDeleteModal() {
  const deleteModal = document.getElementById("deleteModal");
  deleteModal.classList.add("hidden");
  deletingRoutineId = null;
}

/**
 * ========================================
 * ELIMINAR RUTINA
 * ========================================
 */
async function handleDeleteRoutine() {
  if (!deletingRoutineId) return;

  const btnConfirm = document.getElementById("btnConfirmDelete");
  btnConfirm.disabled = true;
  btnConfirm.textContent = "Eliminando...";

  try {
    await deleteDoc(doc(db, "routines", deletingRoutineId));
    showToast("Rutina eliminada correctamente", "success");
    closeDeleteModal();
    loadRoutines();
  } catch (error) {
    console.error("❌ Error al eliminar rutina:", error);
    showToast("Error al eliminar rutina", "error");
  } finally {
    btnConfirm.disabled = false;
    btnConfirm.textContent = "Eliminar";
  }
}

/**
 * ========================================
 * MOSTRAR NOTIFICACIÓN TOAST
 * ========================================
 */
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

/**
 * ========================================
 * EXPORTS
 * ========================================
 */
export { loadRoutines, handleSubmitRoutine, handleDeleteRoutine, showToast };
