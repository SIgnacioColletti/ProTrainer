/**
 * ========================================
 * PROTRAINER - AUTHENTICATION
 * ========================================
 * Manejo de registro, login y validaciones
 */

import { auth } from "./firebaseConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/**
 * ========================================
 * INICIALIZACIÓN
 * ========================================
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("🔐 Módulo de autenticación cargado");
  initAuthListeners();
});

/**
 * ========================================
 * EVENT LISTENERS
 * ========================================
 */
function initAuthListeners() {
  // Formularios
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }

  // Links para cambiar entre login y registro
  const showRegisterLink = document.getElementById("showRegister");
  const showLoginLink = document.getElementById("showLogin");

  if (showRegisterLink) {
    showRegisterLink.addEventListener("click", (e) => {
      e.preventDefault();
      toggleAuthViews("register");
    });
  }

  if (showLoginLink) {
    showLoginLink.addEventListener("click", (e) => {
      e.preventDefault();
      toggleAuthViews("login");
    });
  }

  // Botones de volver
  const backFromLogin = document.getElementById("backFromLogin");
  const backFromRegister = document.getElementById("backFromRegister");

  if (backFromLogin) {
    backFromLogin.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  }

  if (backFromRegister) {
    backFromRegister.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  }
}

/**
 * ========================================
 * MANEJO DE LOGIN
 * ========================================
 */
async function handleLogin(e) {
  e.preventDefault();

  // Obtener valores
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  // Validar
  if (!validateEmail(email)) {
    showToast("Por favor ingresá un email válido", "error");
    return;
  }

  if (password.length < 6) {
    showToast("La contraseña debe tener al menos 6 caracteres", "error");
    return;
  }

  // Deshabilitar botón durante la petición
  const submitBtn = e.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Ingresando...";

  try {
    // Iniciar sesión con Firebase
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("✅ Login exitoso:", user.email);
    showToast("¡Bienvenido de vuelta!", "success");

    // Redirigir al dashboard después de 1 segundo
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } catch (error) {
    console.error("❌ Error en login:", error);
    handleAuthError(error);

    // Rehabilitar botón
    submitBtn.disabled = false;
    submitBtn.textContent = "Iniciar Sesión";
  }
}

/**
 * ========================================
 * MANEJO DE REGISTRO
 * ========================================
 */
async function handleRegister(e) {
  e.preventDefault();

  // Obtener valores
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;
  const passwordConfirm = document.getElementById(
    "registerPasswordConfirm"
  ).value;

  // Validaciones
  if (name.length < 3) {
    showToast("El nombre debe tener al menos 3 caracteres", "error");
    return;
  }

  if (!validateEmail(email)) {
    showToast("Por favor ingresá un email válido", "error");
    return;
  }

  if (password.length < 6) {
    showToast("La contraseña debe tener al menos 6 caracteres", "error");
    return;
  }

  if (password !== passwordConfirm) {
    showToast("Las contraseñas no coinciden", "error");
    return;
  }

  // Deshabilitar botón durante la petición
  const submitBtn = e.target.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Creando cuenta...";

  try {
    // Crear usuario con Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Actualizar perfil con el nombre
    await updateProfile(user, {
      displayName: name,
    });

    console.log("✅ Registro exitoso:", user.email);
    showToast("¡Cuenta creada exitosamente!", "success");

    // Redirigir al dashboard después de 1 segundo
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } catch (error) {
    console.error("❌ Error en registro:", error);
    handleAuthError(error);

    // Rehabilitar botón
    submitBtn.disabled = false;
    submitBtn.textContent = "Crear Cuenta";
  }
}

/**
 * ========================================
 * VALIDACIONES
 * ========================================
 */

/**
 * Validar formato de email
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * ========================================
 * MANEJO DE ERRORES
 * ========================================
 */
function handleAuthError(error) {
  const errorMessages = {
    "auth/email-already-in-use": "Este email ya está registrado",
    "auth/invalid-email": "Email inválido",
    "auth/operation-not-allowed": "Operación no permitida",
    "auth/weak-password": "La contraseña es muy débil",
    "auth/user-disabled": "Esta cuenta fue deshabilitada",
    "auth/user-not-found": "No existe una cuenta con este email",
    "auth/wrong-password": "Contraseña incorrecta",
    "auth/invalid-credential": "Email o contraseña incorrectos",
    "auth/too-many-requests": "Demasiados intentos. Intentá más tarde",
    "auth/network-request-failed": "Error de conexión. Verificá tu internet",
  };

  const message =
    errorMessages[error.code] || "Ocurrió un error. Intentá nuevamente";
  showToast(message, "error");
}

/**
 * ========================================
 * UI HELPERS
 * ========================================
 */

/**
 * Cambiar entre vistas de login y registro
 */
function toggleAuthViews(view) {
  const loginSection = document.getElementById("loginSection");
  const registerSection = document.getElementById("registerSection");

  if (view === "register") {
    loginSection.classList.add("hidden");
    registerSection.classList.remove("hidden");
  } else {
    registerSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
  }
}

/**
 * Mostrar notificación toast
 */
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  if (!toast || !toastMessage) return;

  // Configurar mensaje y tipo
  toastMessage.textContent = message;
  toast.className = `toast ${type}`;

  // Mostrar
  toast.classList.remove("hidden");

  // Ocultar después de 3 segundos
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

/**
 * ========================================
 * EXPORTS
 * ========================================
 */
export { handleLogin, handleRegister, validateEmail, showToast };
