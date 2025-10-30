/**
 * ========================================
 * PROTRAINER - DASHBOARD
 * ========================================
 * Panel principal del usuario autenticado
 */

import { auth, db } from "./firebaseConfig.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/**
 * ========================================
 * INICIALIZACIÓN
 * ========================================
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("📊 Dashboard cargado");

  // Verificar autenticación
  checkAuth();

  // Inicializar eventos
  initDashboardListeners();
});

/**
 * ========================================
 * VERIFICAR AUTENTICACIÓN
 * ========================================
 */
function checkAuth() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Usuario autenticado - cargar datos
      console.log("✅ Usuario autenticado en dashboard:", user.email);
      loadUserData(user);
      loadStats();
    } else {
      // Usuario no autenticado - redirigir
      console.log("❌ Usuario no autenticado, redirigiendo...");
      window.location.href = "../index.html";
    }
  });
}

/**
 * ========================================
 * CARGAR DATOS DEL USUARIO
 * ========================================
 */
function loadUserData(user) {
  // Nombre del usuario
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const userInitial = document.getElementById("userInitial");

  if (userName) {
    userName.textContent = user.displayName || "Usuario";
  }

  if (userEmail) {
    userEmail.textContent = user.email;
  }

  if (userInitial) {
    const initial = (user.displayName || user.email || "U")[0].toUpperCase();
    userInitial.textContent = initial;
  }
}

/**
 * ========================================
 * CARGAR ESTADÍSTICAS
 * ========================================
 */
function loadStats() {
  // Por ahora, datos estáticos
  // En días 4 y 5 cargaremos datos reales de Firestore

  const statWeight = document.getElementById("statWeight");
  const statGoal = document.getElementById("statGoal");
  const statWorkouts = document.getElementById("statWorkouts");
  const statStreak = document.getElementById("statStreak");

  // Simular datos (después vendrán de Firestore)
  if (statWeight) statWeight.textContent = "-- kg";
  if (statGoal) statGoal.textContent = "0/5 días";
  if (statWorkouts) statWorkouts.textContent = "0 totales";
  if (statStreak) statStreak.textContent = "0 días";

  // Tip aleatorio
  loadDailyTip();
}

/**
 * ========================================
 * TIP DIARIO ALEATORIO
 * ========================================
 */
function loadDailyTip() {
  const tips = [
    "La constancia es más importante que la intensidad. ¡Seguí adelante!",
    "Descansá bien. Los músculos crecen durante el descanso.",
    "Hidratate constantemente durante todo el día.",
    "La técnica correcta previene lesiones y maximiza resultados.",
    "Calentá siempre antes de entrenar para evitar lesiones.",
    "Variá tus rutinas cada 6-8 semanas para mejores resultados.",
    "La alimentación es el 70% del éxito. ¡Cuidá lo que comés!",
    "Dormí al menos 7-8 horas para una recuperación óptima.",
  ];

  const dailyTip = document.getElementById("dailyTip");
  if (dailyTip) {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    dailyTip.textContent = randomTip;
  }
}

/**
 * ========================================
 * EVENT LISTENERS
 * ========================================
 */
function initDashboardListeners() {
  // Botón de logout
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", handleLogout);
  }

  // Botones de acciones rápidas
  const btnRoutines = document.getElementById("btnRoutines");
  const btnProgress = document.getElementById("btnProgress");
  const btnProfile = document.getElementById("btnProfile");

  if (btnRoutines) {
    btnRoutines.addEventListener("click", () => {
      window.location.href = "routines.html";
    });
  }

  if (btnProgress) {
    btnProgress.addEventListener("click", () => {
      window.location.href = "progress.html";
    });
  }

  if (btnProfile) {
    btnProfile.addEventListener("click", () => {
      window.location.href = "profile.html";
    });
  }
}

/**
 * ========================================
 * MANEJO DE LOGOUT
 * ========================================
 */
async function handleLogout() {
  try {
    await signOut(auth);
    console.log("✅ Logout exitoso");
    showToast("¡Hasta pronto!", "success");

    // Redirigir después de 1 segundo
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1000);
  } catch (error) {
    console.error("❌ Error al cerrar sesión:", error);
    showToast("Error al cerrar sesión", "error");
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
export { loadUserData, loadStats, handleLogout, showToast };
