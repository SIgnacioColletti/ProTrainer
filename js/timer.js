// ============================================
// ARCHIVO: js/timer.js
// ============================================

// ============================================
// VARIABLES GLOBALES DEL TIMER
// ============================================

let timerInterval = null;
let timeRemaining = 60; // segundos por defecto
let timerRunning = false;

// ============================================
// INICIALIZACIÓN DEL TIMER
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("⏱️ Timer module loaded");

  // Verificar que los elementos existen
  const btnCloseTimer = document.getElementById("btnCloseTimer");
  const btnTimerPlay = document.getElementById("btnTimerPlay");
  const btnTimerReset = document.getElementById("btnTimerReset");
  const btnTimerAdd = document.getElementById("btnTimerAdd");
  const btnSetCustom = document.getElementById("btnSetCustom");

  if (
    !btnCloseTimer ||
    !btnTimerPlay ||
    !btnTimerReset ||
    !btnTimerAdd ||
    !btnSetCustom
  ) {
    console.error("❌ Algunos elementos del timer no se encontraron");
    return;
  }

  // Event Listeners
  btnCloseTimer.addEventListener("click", cerrarTimer);
  btnTimerPlay.addEventListener("click", toggleTimer);
  btnTimerReset.addEventListener("click", resetTimer);
  btnTimerAdd.addEventListener("click", addTime);
  btnSetCustom.addEventListener("click", setCustomTime);

  // Presets
  document.querySelectorAll(".preset-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setPresetTime(parseInt(btn.dataset.seconds));

      // Actualizar activo
      document
        .querySelectorAll(".preset-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Actualizar display inicial
  actualizarDisplay();
});

// ============================================
// FUNCIONES DEL TIMER
// ============================================

function toggleTimer() {
  const btn = document.getElementById("btnTimerPlay");

  if (timerRunning) {
    // Pausar
    clearInterval(timerInterval);
    timerRunning = false;
    btn.classList.remove("paused");
    console.log("⏸️ Timer pausado");
  } else {
    // Iniciar
    if (timeRemaining <= 0) {
      timeRemaining = 60;
      actualizarDisplay();
    }

    timerInterval = setInterval(() => {
      timeRemaining--;
      actualizarDisplay();

      if (timeRemaining <= 0) {
        finalizarTimer();
      }
    }, 1000);

    timerRunning = true;
    btn.classList.add("paused");
    console.log("▶️ Timer iniciado");
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;

  // Obtener preset activo o usar 60s por defecto
  const activePreset = document.querySelector(".preset-btn.active");
  timeRemaining = activePreset ? parseInt(activePreset.dataset.seconds) : 60;

  actualizarDisplay();

  const btn = document.getElementById("btnTimerPlay");
  btn.classList.remove("paused");

  console.log("🔄 Timer reseteado");
}

function addTime() {
  timeRemaining += 30;
  actualizarDisplay();
  console.log("➕ +30 segundos agregados");
}

function setPresetTime(seconds) {
  clearInterval(timerInterval);
  timerRunning = false;
  timeRemaining = seconds;
  actualizarDisplay();

  const btn = document.getElementById("btnTimerPlay");
  btn.classList.remove("paused");

  console.log(`⏱️ Timer configurado a ${seconds}s`);
}

function setCustomTime() {
  const minutes = parseInt(document.getElementById("customMinutes").value) || 0;
  const seconds = parseInt(document.getElementById("customSeconds").value) || 0;

  if (minutes === 0 && seconds === 0) {
    alert("Por favor ingresa un tiempo válido");
    return;
  }

  clearInterval(timerInterval);
  timerRunning = false;
  timeRemaining = minutes * 60 + seconds;
  actualizarDisplay();

  const btn = document.getElementById("btnTimerPlay");
  btn.classList.remove("paused");

  // Limpiar inputs
  document.getElementById("customMinutes").value = "";
  document.getElementById("customSeconds").value = "";

  console.log(`⏱️ Timer custom configurado: ${minutes}m ${seconds}s`);
}

function actualizarDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const display = document.getElementById("timerDisplay");
  if (display) {
    display.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
}

function finalizarTimer() {
  clearInterval(timerInterval);
  timerRunning = false;

  console.log("⏰ Timer finalizado!");

  // Reproducir sonido
  const sound = document.getElementById("timerSound");
  if (sound) {
    sound
      .play()
      .catch((e) => console.log("🔇 No se pudo reproducir el sonido:", e));
  }

  // Vibración (si está disponible)
  if ("vibrate" in navigator) {
    navigator.vibrate([200, 100, 200, 100, 200]);
  }

  // Mostrar alerta visual
  const display = document.getElementById("timerDisplay");
  if (display) {
    display.style.color = "#FF0044";
    setTimeout(() => {
      display.style.color = "var(--verde-principal)";
    }, 1000);
  }

  // Mostrar toast
  if (typeof showToast === "function") {
    showToast("⏰ ¡Tiempo completado!");
  }

  // Resetear
  setTimeout(() => {
    resetTimer();
  }, 1500);

  const btn = document.getElementById("btnTimerPlay");
  if (btn) {
    btn.classList.remove("paused");
  }
}

function cerrarTimer() {
  const modal = document.getElementById("timerModal");
  if (modal) {
    modal.classList.remove("active");
  }

  // Pausar si está corriendo
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    const btn = document.getElementById("btnTimerPlay");
    if (btn) {
      btn.classList.remove("paused");
    }
  }
}
