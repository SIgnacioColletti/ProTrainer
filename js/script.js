/**
 * ========================================
 * PROTRAINER - MAIN SCRIPT
 * ========================================
 * Archivo principal de lógica JavaScript
 * Día 2: Sistema de autenticación y navegación
 */

// Importar configuración de Firebase
import { auth, db } from "./firebaseConfig.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/**
 * ========================================
 * INICIALIZACIÓN
 * ========================================
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 ProTrainer iniciado correctamente");

  // Verificar estado de autenticación
  checkAuthState();

  // Inicializar eventos
  initializeEventListeners();

  // Verificar conexión con Firebase (opcional para testing)
  checkFirebaseConnection();
});

/**
 * ========================================
 * VERIFICAR AUTENTICACIÓN
 * ========================================
 */
function checkAuthState() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Usuario está logueado
      console.log("✅ Usuario autenticado:", user.email);
      // Si está en la landing, redirigir al dashboard
      if (
        window.location.pathname.includes("index.html") ||
        window.location.pathname === "/" ||
        window.location.pathname.endsWith("/proTrainer/")
      ) {
        window.location.href = "pages/dashboard.html";
      }
    } else {
      // Usuario no está logueado
      console.log("❌ Usuario no autenticado");
    }
  });
}

/**
 * ========================================
 * EVENT LISTENERS
 * ========================================
 */
function initializeEventListeners() {
  // Botón de inicio de sesión
  const btnLogin = document.getElementById("btnLogin");
  if (btnLogin) {
    btnLogin.addEventListener("click", handleLoginClick);
  }

  // Botón de registro
  const btnRegister = document.getElementById("btnRegister");
  if (btnRegister) {
    btnRegister.addEventListener("click", handleRegisterClick);
  }
}

/**
 * Manejar click en botón de login
 */
function handleLoginClick() {
  console.log("📱 Usuario presionó: Iniciar sesión");
  window.location.href = "pages/auth.html";
}

/**
 * Manejar click en botón de registro
 */
function handleRegisterClick() {
  console.log("📱 Usuario presionó: Registrarse");
  window.location.href = "pages/auth.html";
}

/**
 * ========================================
 * UTILIDADES
 * ========================================
 */

/**
 * Verificar conexión con Firebase
 * Útil para debugging en desarrollo
 */
function checkFirebaseConnection() {
  if (auth && db) {
    console.log("✅ Firebase conectado correctamente");
    console.log("Auth:", auth);
    console.log("Firestore:", db);
  } else {
    console.error("❌ Error al conectar con Firebase");
  }
}

/**
 * ========================================
 * EXPORTAR FUNCIONES (para uso futuro)
 * ========================================
 */
export { handleLoginClick, handleRegisterClick, checkAuthState };
