/**
 * ========================================
 * PROTRAINER - PROGRESS TRACKING
 * ========================================
 * Seguimiento de progreso con Chart.js
 */

import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * ========================================
 * VARIABLES GLOBALES
 * ========================================
 */
let currentUser = null;
let weightChart = null;
let allProgressData = [];
let currentFilter = 30; // días
let deletingProgressId = null;

/**
 * ========================================
 * INICIALIZACIÓN
 * ========================================
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("📊 Módulo de progreso cargado");

  // Establecer fecha actual por defecto
  const dateInput = document.getElementById("date");
  if (dateInput) {
    dateInput.valueAsDate = new Date();
  }

  // Verificar autenticación
  checkAuth();

  // Inicializar eventos
  initProgressListeners();
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
      loadProgress();
    } else {
      console.log("❌ Usuario no autenticado, redirigiendo...");
      window.location.href = "../index.html";
    }
  });
}

/**
 * ========================================
 * CARGAR PROGRESO
 * ========================================
 */
async function loadProgress() {
  const loadingState = document.getElementById("loadingState");
  const emptyState = document.getElementById("emptyState");
  const historySection = document.getElementById("historySection");

  try {
    // Mostrar estado de carga
    loadingState.classList.remove("hidden");
    emptyState.classList.add("hidden");
    historySection.classList.add("hidden");

    // Query a Firestore
    const progressRef = collection(db, "progress");
    const q = query(
      progressRef,
      where("userId", "==", currentUser.uid),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);

    // Ocultar loading
    loadingState.classList.add("hidden");

    if (querySnapshot.empty) {
      // No hay registros
      emptyState.classList.remove("hidden");

      // Inicializar gráfico vacío
      initChart([]);
    } else {
      // Procesar datos
      allProgressData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        allProgressData.push({
          id: doc.id,
          ...data,
          // Convertir Timestamp a Date si existe
          date: data.date?.toDate ? data.date.toDate() : new Date(data.date),
        });
      });

      // Mostrar historial
      historySection.classList.remove("hidden");
      renderHistory();

      // Actualizar gráfico
      updateChart();
    }
  } catch (error) {
    console.error("❌ Error al cargar progreso:", error);
    loadingState.classList.add("hidden");
    showToast("Error al cargar progreso", "error");
  }
}

/**
 * ========================================
 * INICIALIZAR GRÁFICO
 * ========================================
 */
function initChart(data) {
  const ctx = document.getElementById("weightChart");

  if (!ctx) return;

  // Destruir gráfico anterior si existe
  if (weightChart) {
    weightChart.destroy();
  }

  // Configuración del gráfico
  weightChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((item) => formatDate(item.date)),
      datasets: [
        {
          label: "Peso (kg)",
          data: data.map((item) => item.weight),
          borderColor: "#00FF88",
          backgroundColor: "rgba(0, 255, 136, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: "#00FF88",
          pointBorderColor: "#000000",
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "#00FF88",
          bodyColor: "#FFFFFF",
          borderColor: "#00FF88",
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: function (context) {
              return `${context.parsed.y} kg`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: "rgba(0, 255, 136, 0.1)",
          },
          ticks: {
            color: "#B0B0B0",
            callback: function (value) {
              return value + " kg";
            },
          },
        },
        x: {
          grid: {
            color: "rgba(0, 255, 136, 0.1)",
          },
          ticks: {
            color: "#B0B0B0",
          },
        },
      },
    },
  });
}

/**
 * ========================================
 * ACTUALIZAR GRÁFICO SEGÚN FILTRO
 * ========================================
 */
function updateChart() {
  // Filtrar datos según el período seleccionado
  let filteredData = [...allProgressData];

  if (currentFilter !== "all") {
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - currentFilter);

    filteredData = filteredData.filter((item) => item.date >= daysAgo);
  }

  // Ordenar por fecha ascendente para el gráfico
  filteredData.sort((a, b) => a.date - b.date);

  // Inicializar gráfico con datos filtrados
  initChart(filteredData);
}

/**
 * ========================================
 * RENDERIZAR HISTORIAL
 * ========================================
 */
function renderHistory() {
  const historyList = document.getElementById("historyList");
  if (!historyList) return;

  historyList.innerHTML = "";

  allProgressData.forEach((record) => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";

    historyItem.innerHTML = `
            <div class="history-header">
                <span class="history-date">${formatDateLong(record.date)}</span>
                <button class="btn-delete-history" data-id="${record.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
            <div class="history-measurements">
                <div class="measurement-item">
                    <span class="measurement-label">Peso</span>
                    <span class="measurement-value highlight">${
                      record.weight
                    } kg</span>
                </div>
                ${
                  record.chest
                    ? `
                <div class="measurement-item">
                    <span class="measurement-label">Pecho</span>
                    <span class="measurement-value">${record.chest} cm</span>
                </div>
                `
                    : ""
                }
                ${
                  record.waist
                    ? `
                <div class="measurement-item">
                    <span class="measurement-label">Cintura</span>
                    <span class="measurement-value">${record.waist} cm</span>
                </div>
                `
                    : ""
                }
                ${
                  record.arms
                    ? `
                <div class="measurement-item">
                    <span class="measurement-label">Brazos</span>
                    <span class="measurement-value">${record.arms} cm</span>
                </div>
                `
                    : ""
                }
                ${
                  record.legs
                    ? `
                <div class="measurement-item">
                    <span class="measurement-label">Piernas</span>
                    <span class="measurement-value">${record.legs} cm</span>
                </div>
                `
                    : ""
                }
            </div>
            ${
              record.notes
                ? `
            <div class="history-notes">
                "${record.notes}"
            </div>
            `
                : ""
            }
        `;

    historyList.appendChild(historyItem);

    // Event listener para eliminar
    historyItem
      .querySelector(".btn-delete-history")
      .addEventListener("click", () => {
        openDeleteModal(record.id);
      });
  });
}

/**
 * ========================================
 * EVENT LISTENERS
 * ========================================
 */
function initProgressListeners() {
  // Botón volver
  const btnBack = document.getElementById("btnBack");
  if (btnBack) {
    btnBack.addEventListener("click", () => {
      window.location.href = "dashboard.html";
    });
  }

  // Botones para abrir modal
  const btnAddProgress = document.getElementById("btnAddProgress");
  const btnAddProgressEmpty = document.getElementById("btnAddProgressEmpty");

  if (btnAddProgress) {
    btnAddProgress.addEventListener("click", openProgressModal);
  }

  if (btnAddProgressEmpty) {
    btnAddProgressEmpty.addEventListener("click", openProgressModal);
  }

  // Botones del modal
  const btnCloseModal = document.getElementById("btnCloseModal");
  const btnCancelModal = document.getElementById("btnCancelModal");
  const progressForm = document.getElementById("progressForm");

  if (btnCloseModal) {
    btnCloseModal.addEventListener("click", closeProgressModal);
  }

  if (btnCancelModal) {
    btnCancelModal.addEventListener("click", closeProgressModal);
  }

  if (progressForm) {
    progressForm.addEventListener("submit", handleSubmitProgress);
  }

  // Filtros del gráfico
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remover active de todos
      filterButtons.forEach((b) => b.classList.remove("active"));
      // Agregar active al clickeado
      btn.classList.add("active");

      // Actualizar filtro
      const period = btn.dataset.period;
      currentFilter = period === "all" ? "all" : parseInt(period);

      // Actualizar gráfico
      updateChart();
    });
  });

  // Botones del modal de eliminación
  const btnCloseDeleteModal = document.getElementById("btnCloseDeleteModal");
  const btnCancelDelete = document.getElementById("btnCancelDelete");
  const btnConfirmDelete = document.getElementById("btnConfirmDelete");

  if (btnCloseDeleteModal) {
    btnCloseDeleteModal.addEventListener("click", closeDeleteModal);
  }

  if (btnCancelDelete) {
    btnCancelDelete.addEventListener("click", closeDeleteModal);
  }

  if (btnConfirmDelete) {
    btnConfirmDelete.addEventListener("click", handleDeleteProgress);
  }
}

/**
 * ========================================
 * ABRIR/CERRAR MODAL
 * ========================================
 */
function openProgressModal() {
  const modal = document.getElementById("progressModal");
  modal.classList.remove("hidden");
}

function closeProgressModal() {
  const modal = document.getElementById("progressModal");
  const form = document.getElementById("progressForm");

  modal.classList.add("hidden");
  form.reset();

  // Restablecer fecha actual
  const dateInput = document.getElementById("date");
  if (dateInput) {
    dateInput.valueAsDate = new Date();
  }
}

/**
 * ========================================
 * GUARDAR PROGRESO
 * ========================================
 */
async function handleSubmitProgress(e) {
  e.preventDefault();

  // Obtener valores
  const weight = parseFloat(document.getElementById("weight").value);
  const chest = document.getElementById("chest").value
    ? parseFloat(document.getElementById("chest").value)
    : null;
  const waist = document.getElementById("waist").value
    ? parseFloat(document.getElementById("waist").value)
    : null;
  const arms = document.getElementById("arms").value
    ? parseFloat(document.getElementById("arms").value)
    : null;
  const legs = document.getElementById("legs").value
    ? parseFloat(document.getElementById("legs").value)
    : null;
  const dateValue = document.getElementById("date").value;
  const notes = document.getElementById("notes").value.trim();

  // Validación
  if (!weight || !dateValue) {
    showToast("Por favor completá peso y fecha", "error");
    return;
  }

  // Convertir fecha a Timestamp
  const selectedDate = new Date(dateValue + "T12:00:00");

  // Deshabilitar botón
  const btnSubmit = document.getElementById("btnSubmitProgress");
  btnSubmit.disabled = true;
  btnSubmit.textContent = "Guardando...";

  try {
    // Crear objeto con datos
    const progressData = {
      userId: currentUser.uid,
      weight,
      date: Timestamp.fromDate(selectedDate),
      createdAt: serverTimestamp(),
    };

    // Agregar medidas opcionales si existen
    if (chest) progressData.chest = chest;
    if (waist) progressData.waist = waist;
    if (arms) progressData.arms = arms;
    if (legs) progressData.legs = legs;
    if (notes) progressData.notes = notes;

    // Guardar en Firestore
    await addDoc(collection(db, "progress"), progressData);

    showToast("Progreso registrado correctamente", "success");
    closeProgressModal();
    loadProgress();
  } catch (error) {
    console.error("❌ Error al guardar progreso:", error);
    showToast("Error al guardar progreso", "error");
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.textContent = "Guardar";
  }
}

/**
 * ========================================
 * ABRIR MODAL DE CONFIRMACIÓN
 * ========================================
 */
function openDeleteModal(progressId) {
  deletingProgressId = progressId;
  const deleteModal = document.getElementById("deleteModal");
  deleteModal.classList.remove("hidden");
}

/**
 * ========================================
 * CERRAR MODAL DE ELIMINACIÓN
 * ========================================
 */
function closeDeleteModal() {
  const deleteModal = document.getElementById("deleteModal");
  deleteModal.classList.add("hidden");
  deletingProgressId = null;
}

/**
 * ========================================
 * ELIMINAR PROGRESO
 * ========================================
 */
async function handleDeleteProgress() {
  if (!deletingProgressId) return;

  const btnConfirm = document.getElementById("btnConfirmDelete");
  btnConfirm.disabled = true;
  btnConfirm.textContent = "Eliminando...";

  try {
    await deleteDoc(doc(db, "progress", deletingProgressId));
    showToast("Registro eliminado correctamente", "success");
    closeDeleteModal();
    loadProgress();
  } catch (error) {
    console.error("❌ Error al eliminar progreso:", error);
    showToast("Error al eliminar registro", "error");
  } finally {
    btnConfirm.disabled = false;
    btnConfirm.textContent = "Eliminar";
  }
}

/**
 * ========================================
 * UTILIDADES
 * ========================================
 */

/**
 * Formatear fecha corta para gráfico
 */
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${day}/${month}`;
}

/**
 * Formatear fecha larga para historial
 */
function formatDateLong(date) {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("es-AR", options);
}

/**
 * Mostrar notificación toast
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
export {
  loadProgress,
  handleSubmitProgress,
  handleDeleteProgress,
  openDeleteModal,
  closeDeleteModal,
  showToast,
};
