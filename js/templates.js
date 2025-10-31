// ============================================
// ARCHIVO: js/templates.js
// ============================================

import { auth, db } from "./firebaseConfig.js";
import { templatesDatabase } from "./templatesData.js";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ============================================
// VARIABLES GLOBALES
// ============================================

let allTemplates = [...templatesDatabase];
let filteredTemplates = [...templatesDatabase];
let selectedTemplate = null;
let currentFilters = {
  level: "all",
  category: "all",
};

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("📋 Plantillas de Rutinas cargadas");
  console.log(`📚 ${allTemplates.length} plantillas disponibles`);

  // Verificar autenticación
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "auth.html";
      return;
    }

    renderTemplates();
  });

  // Event Listeners - Navegación
  document.getElementById("btnBack").addEventListener("click", () => {
    window.location.href = "routines.html";
  });

  // Event Listeners - Filtros de nivel
  document.querySelectorAll(".filter-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-tab")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilters.level = btn.dataset.filter;
      applyFilters();
    });
  });

  // Event Listeners - Filtros de categoría
  document.querySelectorAll(".filter-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-chip")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilters.category = btn.dataset.category;
      applyFilters();
    });
  });

  // Event Listeners - Modales
  document
    .getElementById("btnCloseModal")
    .addEventListener("click", closeDetailModal);
  document
    .getElementById("btnCloseCustomize")
    .addEventListener("click", closeCustomizeModal);
  document
    .getElementById("btnCancelCustomize")
    .addEventListener("click", closeCustomizeModal);
  document
    .getElementById("customizeForm")
    .addEventListener("submit", saveCustomizedRoutine);
});

// ============================================
// FILTROS
// ============================================

function applyFilters() {
  filteredTemplates = allTemplates.filter((template) => {
    const levelMatch =
      currentFilters.level === "all" || template.level === currentFilters.level;

    const categoryMatch =
      currentFilters.category === "all" ||
      template.category === currentFilters.category;

    return levelMatch && categoryMatch;
  });

  renderTemplates();
}

// ============================================
// RENDERIZAR PLANTILLAS
// ============================================

function renderTemplates() {
  const container = document.getElementById("templatesContainer");
  const resultsCount = document.getElementById("resultsCount");

  resultsCount.textContent = `${filteredTemplates.length} plantilla${
    filteredTemplates.length !== 1 ? "s" : ""
  } disponible${filteredTemplates.length !== 1 ? "s" : ""}`;

  container.innerHTML = "";

  if (filteredTemplates.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="9" y1="9" x2="15" y2="9"/>
                    <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
                <p>No se encontraron plantillas con estos filtros</p>
            </div>
        `;
    return;
  }

  filteredTemplates.forEach((template) => {
    const card = createTemplateCard(template);
    container.appendChild(card);
  });
}

function createTemplateCard(template) {
  const card = document.createElement("div");
  card.className = "template-card";

  const totalExercises = template.exercises.length;

  card.innerHTML = `
        <div class="template-header">
            <h2 class="template-title">${template.name}</h2>
            <div class="template-badges">
                <span class="badge badge-level">${capitalize(
                  template.level
                )}</span>
                <span class="badge badge-category">${getCategoryName(
                  template.category
                )}</span>
            </div>
        </div>
        
        <p class="template-description">${template.description}</p>
        
        <div class="template-info">
            <div class="info-item">
                <span class="info-value">${template.days}</span>
                <span class="info-label">días/semana</span>
            </div>
            <div class="info-item">
                <span class="info-value">${totalExercises}</span>
                <span class="info-label">ejercicios</span>
            </div>
            <div class="info-item">
                <span class="info-value">${template.duration}</span>
                <span class="info-label">minutos</span>
            </div>
        </div>
        
        <div class="template-goals">
            <h4>🎯 Objetivos:</h4>
            <ul>
                ${template.goals
                  .slice(0, 3)
                  .map((goal) => `<li>${goal}</li>`)
                  .join("")}
            </ul>
        </div>
        
        <button class="btn-use-template" data-id="${template.id}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            Ver Detalles
        </button>
    `;

  // Event listener
  const btnUse = card.querySelector(".btn-use-template");
  btnUse.addEventListener("click", () => {
    openDetailModal(template);
  });

  return card;
}

// ============================================
// MODAL DETALLE
// ============================================

function openDetailModal(template) {
  selectedTemplate = template;
  const modal = document.getElementById("templateModal");
  const modalContent = document.getElementById("modalContent");

  // Agrupar ejercicios por día si es necesario
  const exercisesHTML = renderExercisesList(template.exercises);

  modalContent.innerHTML = `
        <h2>${template.name}</h2>
        
        <div class="template-badges" style="margin-bottom: 1.5rem;">
            <span class="badge badge-level">${capitalize(template.level)}</span>
            <span class="badge badge-category">${getCategoryName(
              template.category
            )}</span>
            <span class="badge" style="background: var(--gris-medio);">${
              template.days
            } días/semana</span>
            <span class="badge" style="background: var(--gris-medio);">${
              template.duration
            } min</span>
        </div>
        
        <div class="modal-section">
            <h3>📝 Descripción</h3>
            <p>${template.description}</p>
        </div>
        
        <div class="modal-section">
            <h3>🎯 Objetivos</h3>
            <ul style="list-style: none; padding: 0;">
                ${template.goals
                  .map(
                    (goal) => `
                    <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative; color: var(--gris-claro);">
                        <span style="position: absolute; left: 0; color: var(--verde-principal); font-weight: 700;">✓</span>
                        ${goal}
                    </li>
                `
                  )
                  .join("")}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>📅 Horario Sugerido</h3>
            <p style="color: var(--gris-claro);">${template.schedule}</p>
        </div>
        
        <div class="modal-section">
            <h3>💪 Ejercicios (${template.exercises.length} totales)</h3>
            <div class="exercises-list">
                ${exercisesHTML}
            </div>
        </div>
        
        <div class="modal-actions">
            <button class="btn-action btn-save" id="btnUseTemplate">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                Usar esta Rutina
            </button>
        </div>
    `;

  // Event listener
  modalContent
    .querySelector("#btnUseTemplate")
    .addEventListener("click", () => {
      closeDetailModal();
      openCustomizeModal();
    });

  modal.classList.add("active");
}

function closeDetailModal() {
  document.getElementById("templateModal").classList.remove("active");
}

function renderExercisesList(exercises) {
  // Mostrar solo los primeros 10 ejercicios en el detalle
  const displayExercises = exercises.slice(0, 10);
  const remaining = exercises.length - 10;

  let html = displayExercises
    .map(
      (exercise) => `
        <div class="exercise-item">
            <h4>${exercise.name}</h4>
            <p>${exercise.sets.length} series × ${
        exercise.sets[0].reps
      } reps - ${capitalize(exercise.category)}</p>
        </div>
    `
    )
    .join("");

  if (remaining > 0) {
    html += `
            <div class="exercise-item" style="background: var(--gris-claro); border-left: 4px solid var(--verde-oscuro);">
                <h4>+ ${remaining} ejercicios más</h4>
                <p style="color: var(--verde-principal);">Personaliza la rutina para ver todos los ejercicios</p>
            </div>
        `;
  }

  return html;
}

// ============================================
// MODAL PERSONALIZAR
// ============================================

function openCustomizeModal() {
  const modal = document.getElementById("customizeModal");

  // Pre-llenar nombre
  document.getElementById(
    "customRoutineName"
  ).value = `${selectedTemplate.name} - Mi Versión`;

  // Renderizar ejercicios
  const exercisesPreview = document.getElementById("exercisesPreview");
  exercisesPreview.innerHTML = `
        <h4>Ejercicios incluidos:</h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 200px; overflow-y: auto;">
            ${selectedTemplate.exercises
              .map(
                (exercise, index) => `
                <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: var(--gris-oscuro); border-radius: 4px; font-size: 0.9rem;">
                    <span>${index + 1}. ${exercise.name}</span>
                    <span style="color: var(--verde-principal);">${
                      exercise.sets.length
                    }×${exercise.sets[0].reps}</span>
                </div>
            `
              )
              .join("")}
        </div>
    `;

  modal.classList.add("active");
}

function closeCustomizeModal() {
  document.getElementById("customizeModal").classList.remove("active");
}

// ============================================
// GUARDAR RUTINA PERSONALIZADA
// ============================================

async function saveCustomizedRoutine(e) {
  e.preventDefault();

  const customName = document.getElementById("customRoutineName").value.trim();

  if (!customName) {
    showToast("❌ Ingresa un nombre para la rutina");
    return;
  }

  const routineData = {
    name: customName,
    exercises: selectedTemplate.exercises,
    userId: auth.currentUser.uid,
    createdAt: serverTimestamp(),
    fromTemplate: selectedTemplate.id,
    templateName: selectedTemplate.name,
  };

  try {
    const docRef = await addDoc(collection(db, "routines"), routineData);

    console.log("✅ Rutina guardada desde plantilla:", docRef.id);
    showToast(`✅ "${customName}" guardada correctamente`);

    closeCustomizeModal();

    // Redireccionar a rutinas después de 2 segundos
    setTimeout(() => {
      window.location.href = "routines.html";
    }, 2000);
  } catch (error) {
    console.error("❌ Error guardando rutina:", error);
    showToast("Error al guardar la rutina");
  }
}

// ============================================
// UTILIDADES
// ============================================

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getCategoryName(category) {
  const names = {
    fuerza: "Fuerza",
    hipertrofia: "Hipertrofia",
    "perdida-peso": "Pérdida de Peso",
    resistencia: "Resistencia",
  };
  return names[category] || category;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
