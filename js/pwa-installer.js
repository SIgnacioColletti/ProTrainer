// ============================================
// ARCHIVO: js/pwa-installer.js
// ============================================

/**
 * ========================================
 * PWA INSTALLER Y NOTIFICACIONES
 * ========================================
 */

let deferredPrompt;
let swRegistration;

// ========================================
// REGISTRAR SERVICE WORKER
// ========================================

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      swRegistration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      console.log("✅ Service Worker registrado:", swRegistration.scope);

      // Verificar actualizaciones
      swRegistration.addEventListener("updatefound", () => {
        const newWorker = swRegistration.installing;

        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            showUpdateNotification();
          }
        });
      });
    } catch (error) {
      console.error("❌ Error al registrar Service Worker:", error);
    }
  });
}

// ========================================
// DETECTAR EVENTO DE INSTALACIÓN
// ========================================

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("📱 PWA: Evento de instalación detectado");

  // Prevenir el prompt automático
  e.preventDefault();

  // Guardar el evento para usarlo después
  deferredPrompt = e;

  // Mostrar botón de instalación personalizado
  showInstallButton();
});

// ========================================
// MOSTRAR BOTÓN DE INSTALACIÓN
// ========================================

function showInstallButton() {
  // Crear botón flotante de instalación
  const installBtn = document.createElement("button");
  installBtn.id = "pwa-install-btn";
  installBtn.className = "pwa-install-button";
  installBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
    <span>Instalar App</span>
  `;

  installBtn.addEventListener("click", installPWA);

  document.body.appendChild(installBtn);

  // Animar entrada
  setTimeout(() => {
    installBtn.classList.add("show");
  }, 1000);
}

// ========================================
// INSTALAR PWA
// ========================================

async function installPWA() {
  if (!deferredPrompt) {
    console.log("❌ No hay prompt de instalación disponible");
    return;
  }

  // Mostrar el prompt
  deferredPrompt.prompt();

  // Esperar respuesta del usuario
  const { outcome } = await deferredPrompt.userChoice;

  console.log(
    `📱 Usuario ${outcome === "accepted" ? "aceptó" : "rechazó"} la instalación`
  );

  // Limpiar el prompt
  deferredPrompt = null;

  // Ocultar botón
  const installBtn = document.getElementById("pwa-install-btn");
  if (installBtn) {
    installBtn.remove();
  }

  if (outcome === "accepted") {
    showToast("¡ProTrainer instalado! 🎉", "success");
  }
}

// ========================================
// DETECTAR INSTALACIÓN EXITOSA
// ========================================

window.addEventListener("appinstalled", () => {
  console.log("✅ PWA instalada exitosamente");
  deferredPrompt = null;

  // Analytics (opcional)
  if (typeof gtag !== "undefined") {
    gtag("event", "pwa_installed");
  }
});

// ========================================
// NOTIFICACIÓN DE ACTUALIZACIÓN
// ========================================

function showUpdateNotification() {
  const notification = document.createElement("div");
  notification.className = "update-notification";
  notification.innerHTML = `
    <div class="update-content">
      <p>🎉 Nueva versión disponible</p>
      <button id="btn-update-app">Actualizar</button>
      <button id="btn-dismiss-update">Después</button>
    </div>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 500);

  // Event listeners
  document.getElementById("btn-update-app")?.addEventListener("click", () => {
    if (swRegistration && swRegistration.waiting) {
      swRegistration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  });

  document
    .getElementById("btn-dismiss-update")
    ?.addEventListener("click", () => {
      notification.remove();
    });
}

// ========================================
// HELPER: TOAST
// ========================================

function showToast(message, type = "info") {
  const toast = document.getElementById("toast") || createToast();
  const toastMessage = toast.querySelector("#toastMessage") || toast;

  toastMessage.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function createToast() {
  const toast = document.createElement("div");
  toast.id = "toast";
  toast.className = "toast";
  toast.innerHTML = '<p id="toastMessage"></p>';
  document.body.appendChild(toast);
  return toast;
}

// ========================================
// DETECTAR MODO STANDALONE
// ========================================

function isPWAInstalled() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

if (isPWAInstalled()) {
  console.log("✅ App corriendo en modo standalone (PWA instalada)");
  document.body.classList.add("pwa-mode");
}

console.log("✅ PWA Installer cargado");
