/**
 * ========================================
 * PROTRAINER - PROFILE & SETTINGS
 * ========================================
 * Gestión de perfil y configuraciones
 * Con modo edición
 */

import { auth, db } from "./firebaseConfig.js";
import {
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * ========================================
 * VARIABLES GLOBALES
 * ========================================
 */
let currentUser = null;
let userDocRef = null;
let isEditing = false;
let originalData = {}; // Para restaurar si cancela

/**
 * ========================================
 * INICIALIZACIÓN
 * ========================================
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("👤 Módulo de perfil cargado");

  // Cargar tema guardado
  loadTheme();

  // Verificar autenticación
  checkAuth();

  // Inicializar eventos
  initProfileListeners();
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
      userDocRef = doc(db, "users", user.uid);
      console.log("✅ Usuario autenticado:", user.email);
      loadUserProfile();
    } else {
      console.log("❌ Usuario no autenticado, redirigiendo...");
      window.location.href = "../index.html";
    }
  });
}

/**
 * ========================================
 * CARGAR PERFIL DEL USUARIO
 * ========================================
 */
async function loadUserProfile() {
  try {
    // Datos básicos de Auth
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profileInitial = document.getElementById("profileInitial");
    const accountEmail = document.getElementById("accountEmail");

    if (profileName) {
      profileName.textContent = currentUser.displayName || "Usuario";
    }

    if (profileEmail) {
      profileEmail.textContent = currentUser.email;
    }

    if (accountEmail) {
      accountEmail.textContent = currentUser.email;
    }

    if (profileInitial) {
      const initial = (currentUser.displayName ||
        currentUser.email ||
        "U")[0].toUpperCase();
      profileInitial.textContent = initial;
    }

    // Cargar datos adicionales de Firestore
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Llenar formulario
      document.getElementById("name").value =
        userData.name || currentUser.displayName || "";
      document.getElementById("age").value = userData.age || "";
      document.getElementById("height").value = userData.height || "";
      document.getElementById("goal").value = userData.goal || "";

      // Guardar datos originales
      originalData = {
        name: userData.name || currentUser.displayName || "",
        age: userData.age || "",
        height: userData.height || "",
        goal: userData.goal || "",
      };

      // Cargar tema guardado
      if (userData.theme === "light") {
        document.getElementById("themeToggle").checked = true;
        document.body.classList.add("light-theme");
      }
    } else {
      // Si no existe el documento, usar datos de Auth
      const name = currentUser.displayName || "";
      document.getElementById("name").value = name;

      originalData = {
        name: name,
        age: "",
        height: "",
        goal: "",
      };
    }
  } catch (error) {
    console.error("❌ Error al cargar perfil:", error);
    showToast("Error al cargar perfil", "error");
  }
}

/**
 * ========================================
 * EVENT LISTENERS
 * ========================================
 */
function initProfileListeners() {
  // Botón volver
  const btnBack = document.getElementById("btnBack");
  if (btnBack) {
    btnBack.addEventListener("click", () => {
      window.location.href = "dashboard.html";
    });
  }

  // Botón editar
  const btnEdit = document.getElementById("btnEdit");
  if (btnEdit) {
    btnEdit.addEventListener("click", enableEditMode);
  }

  // Botón cancelar
  const btnCancel = document.getElementById("btnCancel");
  if (btnCancel) {
    btnCancel.addEventListener("click", cancelEditMode);
  }

  // Formulario de perfil
  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", handleSaveProfile);
  }

  // Toggle de tema
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("change", handleThemeToggle);
  }
}

/**
 * ========================================
 * HABILITAR MODO EDICIÓN
 * ========================================
 */
function enableEditMode() {
  isEditing = true;

  // Habilitar inputs
  document.getElementById("name").disabled = false;
  document.getElementById("age").disabled = false;
  document.getElementById("height").disabled = false;
  document.getElementById("goal").disabled = false;

  // Mostrar botones de acción
  document.getElementById("formActions").classList.remove("hidden");

  // Ocultar botón editar
  document.getElementById("btnEdit").style.display = "none";

  console.log("✏️ Modo edición activado");
}

/**
 * ========================================
 * CANCELAR MODO EDICIÓN
 * ========================================
 */
function cancelEditMode() {
  isEditing = false;

  // Restaurar valores originales
  document.getElementById("name").value = originalData.name;
  document.getElementById("age").value = originalData.age;
  document.getElementById("height").value = originalData.height;
  document.getElementById("goal").value = originalData.goal;

  // Deshabilitar inputs
  document.getElementById("name").disabled = true;
  document.getElementById("age").disabled = true;
  document.getElementById("height").disabled = true;
  document.getElementById("goal").disabled = true;

  // Ocultar botones de acción
  document.getElementById("formActions").classList.add("hidden");

  // Mostrar botón editar
  document.getElementById("btnEdit").style.display = "flex";

  console.log("❌ Modo edición cancelado");
}

/**
 * ========================================
 * GUARDAR PERFIL
 * ========================================
 */
async function handleSaveProfile(e) {
  e.preventDefault();

  if (!isEditing) return;

  // Obtener valores
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value
    ? parseInt(document.getElementById("age").value)
    : null;
  const height = document.getElementById("height").value
    ? parseInt(document.getElementById("height").value)
    : null;
  const goal = document.getElementById("goal").value;

  // Validación
  if (!name || name.length < 3) {
    showToast("El nombre debe tener al menos 3 caracteres", "error");
    return;
  }

  // Deshabilitar botón
  const btnSave = document.getElementById("btnSaveProfile");
  btnSave.disabled = true;
  btnSave.textContent = "Guardando...";

  try {
    // Actualizar displayName en Firebase Auth
    await updateProfile(currentUser, {
      displayName: name,
    });

    // Preparar datos para Firestore
    const userData = {
      userId: currentUser.uid,
      name,
      email: currentUser.email,
      updatedAt: serverTimestamp(),
    };

    // Agregar campos opcionales
    if (age) userData.age = age;
    if (height) userData.height = height;
    if (goal) userData.goal = goal;

    // Verificar si el documento existe
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Actualizar documento existente
      await updateDoc(userDocRef, userData);
    } else {
      // Crear nuevo documento
      userData.createdAt = serverTimestamp();
      await setDoc(userDocRef, userData);
    }

    showToast("Perfil actualizado correctamente", "success");

    // Actualizar UI
    document.getElementById("profileName").textContent = name;
    const initial = name[0].toUpperCase();
    document.getElementById("profileInitial").textContent = initial;

    // Actualizar datos originales
    originalData = {
      name,
      age: age || "",
      height: height || "",
      goal,
    };

    // Salir del modo edición
    cancelEditMode();
  } catch (error) {
    console.error("❌ Error al guardar perfil:", error);
    showToast("Error al guardar perfil", "error");
  } finally {
    btnSave.disabled = false;
    btnSave.textContent = "Guardar Cambios";
  }
}

/**
 * ========================================
 * TOGGLE DE TEMA
 * ========================================
 */
async function handleThemeToggle(e) {
  const isLight = e.target.checked;

  if (isLight) {
    document.body.classList.add("light-theme");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light-theme");
    localStorage.setItem("theme", "dark");
  }

  // Guardar preferencia en Firestore
  try {
    const userDoc = await getDoc(userDocRef);
    const theme = isLight ? "light" : "dark";

    if (userDoc.exists()) {
      await updateDoc(userDocRef, { theme });
    } else {
      await setDoc(userDocRef, {
        userId: currentUser.uid,
        email: currentUser.email,
        theme,
        createdAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("❌ Error al guardar tema:", error);
  }
}

/**
 * ========================================
 * CARGAR TEMA
 * ========================================
 */
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
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
export {
  loadUserProfile,
  handleSaveProfile,
  handleThemeToggle,
  enableEditMode,
  cancelEditMode,
  showToast,
};
