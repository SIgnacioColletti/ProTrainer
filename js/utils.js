// ====================================
// UTILIDADES GLOBALES
// ProTrainer - Funciones Helper
// ====================================

// Validación de email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validación de contraseña (mínimo 6 caracteres)
function validatePassword(password) {
  return password.length >= 6;
}

// Formatear fecha
function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("es-ES", options);
}

// Formatear número con decimales
function formatNumber(number, decimals = 2) {
  return Number(number).toFixed(decimals);
}

// Sanitizar input (prevenir XSS)
function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// Debounce para optimizar eventos
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle para scroll events
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Crear elemento con clases y atributos
function createElement(tag, classes = [], attributes = {}) {
  const element = document.createElement(tag);

  if (classes.length) {
    element.classList.add(...classes);
  }

  Object.keys(attributes).forEach((key) => {
    element.setAttribute(key, attributes[key]);
  });

  return element;
}

// Animación de scroll suave
function smoothScrollTo(element) {
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Copiar al portapapeles
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showMessage("Copiado al portapapeles", "success");
  } catch (err) {
    showMessage("Error al copiar", "error");
  }
}

// Detectar modo oscuro del sistema
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Guardar en localStorage con manejo de errores
function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
    return false;
  }
}

// Leer de localStorage
function getFromLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error al leer localStorage:", error);
    return defaultValue;
  }
}

// Exportar funciones
window.utils = {
  validateEmail,
  validatePassword,
  formatDate,
  formatNumber,
  sanitizeInput,
  debounce,
  throttle,
  createElement,
  smoothScrollTo,
  copyToClipboard,
  getSystemTheme,
  saveToLocalStorage,
  getFromLocalStorage,
};
