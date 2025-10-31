// ============================================
// ARCHIVO: js/calculators.js
// ============================================

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("🧮 Calculadoras iniciadas");

  // Inicializar tabs
  initializeTabs();

  // Cargar historial
  loadHistory();
});

// ========================================
// SISTEMA DE TABS
// ========================================

function initializeTabs() {
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remover active de todos
      document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll(".calculator-section")
        .forEach((s) => s.classList.remove("active"));

      // Activar seleccionado
      tab.classList.add("active");
      const targetSection = document.getElementById(
        `${tab.dataset.tab}-section`
      );
      targetSection.classList.add("active");

      console.log(`📊 Cambiando a calculadora: ${tab.dataset.tab}`);
    });
  });
}

// ========================================
// CALCULADORA 1RM
// ========================================

window.calculateOneRM = function () {
  const weight = parseFloat(document.getElementById("weight").value);
  const reps = parseInt(document.getElementById("reps").value);
  const formula = document.getElementById("formula").value;

  // Validaciones
  if (!weight || !reps) {
    alert("⚠️ Por favor completa todos los campos");
    return;
  }

  if (reps > 20) {
    alert("⚠️ Para más de 20 reps, el cálculo es menos preciso");
  }

  // Calcular 1RM según fórmula
  let oneRM;

  switch (formula) {
    case "epley":
      oneRM = weight * (1 + reps / 30);
      break;
    case "brzycki":
      oneRM = weight * (36 / (37 - reps));
      break;
    case "lander":
      oneRM = (100 * weight) / (101.3 - 2.67123 * reps);
      break;
    case "lombardi":
      oneRM = weight * Math.pow(reps, 0.1);
      break;
  }

  oneRM = Math.round(oneRM * 10) / 10;

  console.log(`💪 1RM calculado: ${oneRM}kg (${formula})`);

  // Mostrar resultado
  document.getElementById("oneRM-value").textContent = `${oneRM} kg`;
  document.getElementById("oneRM-results").style.display = "block";

  // Generar tabla de porcentajes
  generatePercentageTable(oneRM);

  // Guardar en historial
  saveToHistory("1RM", `${oneRM}kg (${weight}kg x ${reps} reps)`);

  // Scroll a resultados
  document
    .getElementById("oneRM-results")
    .scrollIntoView({ behavior: "smooth", block: "nearest" });
};

function generatePercentageTable(oneRM) {
  const percentages = [95, 90, 85, 80, 75, 70, 65, 60];
  const repsRange = {
    95: "1-2",
    90: "2-3",
    85: "3-5",
    80: "5-8",
    75: "8-10",
    70: "10-12",
    65: "12-15",
    60: "15+",
  };

  const tableContainer = document.getElementById("percentage-table");
  tableContainer.innerHTML = "";

  percentages.forEach((percent) => {
    const weight = Math.round(oneRM * (percent / 100) * 2) / 2; // Redondear a 0.5kg

    const row = document.createElement("div");
    row.className = "table-row";
    row.innerHTML = `
            <span>${percent}%</span>
            <span>${weight} kg</span>
            <span>${repsRange[percent]} reps</span>
        `;

    tableContainer.appendChild(row);
  });
}

// ========================================
// CALCULADORA TDEE Y MACROS
// ========================================

window.calculateTDEE = function () {
  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const weight = parseFloat(document.getElementById("weight-tdee").value);
  const height = parseInt(document.getElementById("height").value);
  const activity = parseFloat(document.getElementById("activity").value);
  const goal = document.getElementById("goal").value;

  // Validaciones
  if (!age || !weight || !height) {
    alert("⚠️ Por favor completa todos los campos");
    return;
  }

  // Calcular TMB (Tasa Metabólica Basal) - Fórmula Mifflin-St Jeor
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Calcular TDEE
  const tdee = bmr * activity;

  // Ajustar según objetivo
  let targetCals;
  switch (goal) {
    case "loss":
      targetCals = tdee * 0.8; // -20%
      break;
    case "maintain":
      targetCals = tdee;
      break;
    case "gain":
      targetCals = tdee * 1.1; // +10%
      break;
  }

  bmr = Math.round(bmr);
  const tdeeRounded = Math.round(tdee);
  targetCals = Math.round(targetCals);

  console.log(
    `🔥 TMB: ${bmr} | TDEE: ${tdeeRounded} | Objetivo: ${targetCals}`
  );

  // Calcular macros
  const proteinG = Math.round(weight * 2); // 2g por kg
  const proteinCal = proteinG * 4;

  const fatsG = Math.round(weight * 0.8); // 0.8g por kg
  const fatsCal = fatsG * 9;

  const carbsCal = targetCals - proteinCal - fatsCal;
  const carbsG = Math.round(carbsCal / 4);

  // Mostrar resultados
  document.getElementById("bmr-value").textContent = bmr;
  document.getElementById("tdee-value").textContent = tdeeRounded;
  document.getElementById("goal-value").textContent = targetCals;

  document.getElementById("protein-g").textContent = `${proteinG}g`;
  document.getElementById("protein-cal").textContent = `${proteinCal} kcal`;

  document.getElementById("carbs-g").textContent = `${carbsG}g`;
  document.getElementById("carbs-cal").textContent = `${carbsCal} kcal`;

  document.getElementById("fats-g").textContent = `${fatsG}g`;
  document.getElementById("fats-cal").textContent = `${fatsCal} kcal`;

  document.getElementById("tdee-results").style.display = "block";

  // Guardar en historial
  saveToHistory(
    "TDEE",
    `${targetCals} kcal/día (P:${proteinG}g C:${carbsG}g G:${fatsG}g)`
  );

  // Scroll a resultados
  document
    .getElementById("tdee-results")
    .scrollIntoView({ behavior: "smooth", block: "nearest" });
};

// ========================================
// CALCULADORA GRASA CORPORAL
// ========================================

window.toggleBodyfatInputs = function () {
  const gender = document.getElementById("gender-bf").value;
  const hipGroup = document.getElementById("hip-group");

  if (gender === "female") {
    hipGroup.style.display = "flex";
  } else {
    hipGroup.style.display = "none";
  }
};

window.calculateBodyfat = function () {
  const gender = document.getElementById("gender-bf").value;
  const height = parseFloat(document.getElementById("height-bf").value);
  const neck = parseFloat(document.getElementById("neck").value);
  const waist = parseFloat(document.getElementById("waist").value);
  const hip = parseFloat(document.getElementById("hip").value);

  // Validaciones
  if (!height || !neck || !waist) {
    alert("⚠️ Por favor completa todos los campos obligatorios");
    return;
  }

  if (gender === "female" && !hip) {
    alert("⚠️ Por favor ingresa la circunferencia de cadera");
    return;
  }

  // Calcular % grasa corporal - Método US Navy
  let bodyfat;

  if (gender === "male") {
    bodyfat =
      495 /
        (1.0324 -
          0.19077 * Math.log10(waist - neck) +
          0.15456 * Math.log10(height)) -
      450;
  } else {
    bodyfat =
      495 /
        (1.29579 -
          0.35004 * Math.log10(waist + hip - neck) +
          0.221 * Math.log10(height)) -
      450;
  }

  bodyfat = Math.round(bodyfat * 10) / 10;

  console.log(`📊 Grasa corporal: ${bodyfat}%`);

  // Mostrar resultado
  document.getElementById("bodyfat-value").textContent = `${bodyfat}%`;
  document.getElementById("bodyfat-results").style.display = "block";

  // Posicionar indicador en barra
  const indicator = document.getElementById("bf-indicator");
  let position;

  if (gender === "male") {
    position = Math.min(Math.max(((bodyfat - 2) / 28) * 100, 0), 100);
  } else {
    position = Math.min(Math.max(((bodyfat - 10) / 28) * 100, 0), 100);
  }

  indicator.style.left = `${position}%`;

  // Determinar categoría
  const category = getBodyfatCategory(bodyfat, gender);
  document.getElementById("bf-category").textContent = category;

  // Guardar en historial
  saveToHistory("Grasa Corporal", `${bodyfat}% (${category})`);

  // Scroll a resultados
  document
    .getElementById("bodyfat-results")
    .scrollIntoView({ behavior: "smooth", block: "nearest" });
};

function getBodyfatCategory(bf, gender) {
  if (gender === "male") {
    if (bf < 6) return "⚠️ Esencial (demasiado bajo)";
    if (bf < 14) return "🏃 Atlético";
    if (bf < 18) return "💪 Fitness";
    if (bf < 25) return "👍 Promedio";
    return "⚠️ Alto";
  } else {
    if (bf < 14) return "⚠️ Esencial (demasiado bajo)";
    if (bf < 21) return "🏃 Atlético";
    if (bf < 25) return "💪 Fitness";
    if (bf < 32) return "👍 Promedio";
    return "⚠️ Alto";
  }
}

// ========================================
// CALCULADORA PROGRESIÓN
// ========================================

window.calculateProgression = function () {
  const currentWeight = parseFloat(
    document.getElementById("current-weight").value
  );
  const targetWeight = parseFloat(
    document.getElementById("target-weight").value
  );
  const weeks = parseInt(document.getElementById("weeks").value);
  const increment = parseFloat(document.getElementById("increment").value);

  // Validaciones
  if (!currentWeight || !targetWeight || !weeks) {
    alert("⚠️ Por favor completa todos los campos");
    return;
  }

  if (targetWeight <= currentWeight) {
    alert("⚠️ El peso objetivo debe ser mayor al peso actual");
    return;
  }

  // Calcular progresión
  const timeline = [];
  let weight = currentWeight;

  for (let week = 0; week <= weeks; week++) {
    timeline.push({
      week: week,
      weight: Math.round(weight * 10) / 10,
    });

    weight += weight * (increment / 100);
  }

  const finalWeight = timeline[timeline.length - 1].weight;
  const weeklyIncrease =
    Math.round(((finalWeight - currentWeight) / weeks) * 10) / 10;

  console.log(
    `📈 Progresión: ${currentWeight}kg → ${finalWeight}kg en ${weeks} semanas`
  );

  // Mostrar resultados
  document.getElementById(
    "weekly-increase"
  ).textContent = `${weeklyIncrease} kg`;
  document.getElementById("final-weight").textContent = `${finalWeight} kg`;

  // Generar timeline
  const timelineContainer = document.getElementById("progression-timeline");
  timelineContainer.innerHTML =
    '<h3 style="color: var(--primary-green); margin: 0 0 1rem 0;">Progresión Semanal</h3>';

  timeline.forEach((item) => {
    const weekDiv = document.createElement("div");
    weekDiv.className = "timeline-week";
    weekDiv.innerHTML = `
            <span class="week-number">Semana ${item.week}</span>
            <span class="week-weight">${item.weight} kg</span>
        `;
    timelineContainer.appendChild(weekDiv);
  });

  document.getElementById("progression-results").style.display = "block";

  // Guardar en historial
  saveToHistory(
    "Progresión",
    `${currentWeight}kg → ${finalWeight}kg en ${weeks} semanas`
  );

  // Scroll a resultados
  document
    .getElementById("progression-results")
    .scrollIntoView({ behavior: "smooth", block: "nearest" });
};

// ========================================
// CALCULADORA DISCOS
// ========================================

window.calculatePlates = function () {
  const targetLoad = parseFloat(document.getElementById("target-load").value);
  const barWeight = parseFloat(document.getElementById("bar-weight").value);

  // Validaciones
  if (!targetLoad) {
    alert("⚠️ Por favor ingresa el peso objetivo");
    return;
  }

  if (targetLoad < barWeight) {
    alert(
      `⚠️ El peso objetivo debe ser mayor a ${barWeight}kg (peso de la barra)`
    );
    return;
  }

  // Calcular peso en discos
  const platesWeight = targetLoad - barWeight;
  const perSide = platesWeight / 2;

  // Discos disponibles (kg) con colores
  const availablePlates = [
    { weight: 25, color: "#FF0000", name: "Rojo" },
    { weight: 20, color: "#0000FF", name: "Azul" },
    { weight: 15, color: "#FFFF00", name: "Amarillo" },
    { weight: 10, color: "#00FF00", name: "Verde" },
    { weight: 5, color: "#FFFFFF", name: "Blanco" },
    { weight: 2.5, color: "#FF6B6B", name: "Rojo pequeño" },
    { weight: 1.25, color: "#FFE66D", name: "Amarillo pequeño" },
  ];

  // Calcular combinación de discos
  const plates = [];
  let remaining = perSide;

  availablePlates.forEach((plate) => {
    const count = Math.floor(remaining / plate.weight);
    if (count > 0) {
      plates.push({
        ...plate,
        count: count,
      });
      remaining -= count * plate.weight;
    }
  });

  console.log(`🏋️ Discos por lado:`, plates);

  // Mostrar lista de discos
  const platesList = document.getElementById("plates-list");
  platesList.innerHTML = "";

  if (plates.length === 0) {
    platesList.innerHTML =
      '<p style="color: #999;">Solo necesitas la barra</p>';
  } else {
    plates.forEach((plate) => {
      const item = document.createElement("div");
      item.className = "plate-item";
      item.innerHTML = `
                <div class="plate-color" style="background-color: ${
                  plate.color
                };">
                    ${plate.weight}
                </div>
                <div class="plate-info">
                    <div class="plate-weight">${plate.weight}kg ${
        plate.name
      }</div>
                    <div class="plate-count">${plate.count} disco${
        plate.count > 1 ? "s" : ""
      } × 2 lados</div>
                </div>
            `;
      platesList.appendChild(item);
    });
  }

  // Visualización de la barra
  const barVisual = document.getElementById("bar-visual");
  barVisual.innerHTML = "";

  // Lado izquierdo
  const leftSide = document.createElement("div");
  leftSide.className = "bar-side";
  plates.forEach((plate) => {
    for (let i = 0; i < plate.count; i++) {
      const plateDiv = document.createElement("div");
      plateDiv.className = "plate-visual";
      plateDiv.style.backgroundColor = plate.color;
      plateDiv.style.color = plate.weight >= 15 ? "#000" : "#fff";
      plateDiv.textContent = plate.weight;
      leftSide.appendChild(plateDiv);
    }
  });

  // Centro (barra)
  const center = document.createElement("div");
  center.className = "bar-center";
  center.textContent = `${barWeight}kg`;

  // Lado derecho
  const rightSide = document.createElement("div");
  rightSide.className = "bar-side";
  plates.forEach((plate) => {
    for (let i = 0; i < plate.count; i++) {
      const plateDiv = document.createElement("div");
      plateDiv.className = "plate-visual";
      plateDiv.style.backgroundColor = plate.color;
      plateDiv.style.color = plate.weight >= 15 ? "#000" : "#fff";
      plateDiv.textContent = plate.weight;
      rightSide.appendChild(plateDiv);
    }
  });

  barVisual.appendChild(leftSide);
  barVisual.appendChild(center);
  barVisual.appendChild(rightSide);

  document.getElementById("plates-results").style.display = "block";

  // Guardar en historial
  const platesText = plates.map((p) => `${p.count}×${p.weight}kg`).join(", ");
  saveToHistory("Discos", `${targetLoad}kg: ${platesText} por lado`);

  // Scroll a resultados
  document
    .getElementById("plates-results")
    .scrollIntoView({ behavior: "smooth", block: "nearest" });
};

// ========================================
// SISTEMA DE HISTORIAL
// ========================================

function saveToHistory(calcType, result) {
  const history = JSON.parse(localStorage.getItem("calcHistory") || "[]");

  const entry = {
    type: calcType,
    result: result,
    date: new Date().toISOString(),
  };

  history.unshift(entry);

  // Mantener solo últimos 50 cálculos
  if (history.length > 50) {
    history.pop();
  }

  localStorage.setItem("calcHistory", JSON.stringify(history));

  console.log(`💾 Guardado en historial: ${calcType}`);
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("calcHistory") || "[]");
  console.log(`📜 Historial cargado: ${history.length} cálculos`);
}

window.showHistory = function () {
  const modal = document.getElementById("history-modal");
  const historyList = document.getElementById("history-list");
  const history = JSON.parse(localStorage.getItem("calcHistory") || "[]");

  historyList.innerHTML = "";

  if (history.length === 0) {
    historyList.innerHTML =
      '<div class="empty-history">📭 No hay cálculos guardados aún</div>';
  } else {
    history.forEach((entry) => {
      const date = new Date(entry.date);
      const formattedDate = date.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });

      const item = document.createElement("div");
      item.className = "history-item";
      item.innerHTML = `
                <div class="history-date">${formattedDate}</div>
                <div class="history-calc">${entry.type}</div>
                <div class="history-result">${entry.result}</div>
            `;

      historyList.appendChild(item);
    });
  }

  modal.classList.add("active");
};

window.closeHistory = function () {
  document.getElementById("history-modal").classList.remove("active");
};

// Cerrar modal al hacer click fuera
document.getElementById("history-modal")?.addEventListener("click", (e) => {
  if (e.target.id === "history-modal") {
    closeHistory();
  }
});

console.log("✅ Módulo calculators.js cargado");
