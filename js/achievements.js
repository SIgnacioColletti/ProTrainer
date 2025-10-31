// ============================================
// ARCHIVO: js/achievements.js
// ============================================

import { auth, db } from "./firebaseConfig.js";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  increment,
  query,
  where,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  ACHIEVEMENTS,
  RARITY_COLORS,
  RARITY_NAMES,
  getAllAchievements,
  getAchievementById,
} from "./achievementsData.js";

// ========================================
// VERIFICAR LOGROS
// ========================================

export async function checkAchievements(userId, stats) {
  console.log("🏆 Verificando logros...", stats);

  const newAchievements = [];
  const allAchievements = getAllAchievements();

  // Obtener logros ya desbloqueados
  const unlockedAchievements = await getUnlockedAchievements(userId);
  const unlockedIds = unlockedAchievements.map((a) => a.achievementId);

  // Verificar cada logro
  for (const achievement of allAchievements) {
    // Si ya está desbloqueado, saltar
    if (unlockedIds.includes(achievement.id)) continue;

    // Verificar si cumple el requisito
    let isUnlocked = false;

    switch (achievement.type) {
      case "streak":
        isUnlocked = stats.currentStreak >= achievement.requirement;
        break;

      case "pr_count":
        isUnlocked = stats.totalPRs >= achievement.requirement;
        break;

      case "total_volume":
        isUnlocked = stats.totalVolume >= achievement.requirement;
        break;

      case "workout_count":
        isUnlocked = stats.totalWorkouts >= achievement.requirement;
        break;

      case "unique_exercises":
        isUnlocked = stats.uniqueExercises >= achievement.requirement;
        break;

      case "muscle_groups":
        isUnlocked = stats.muscleGroupsTrained >= achievement.requirement;
        break;

      case "goals_completed":
        isUnlocked = stats.goalsCompleted >= achievement.requirement;
        break;

      case "weight_goal":
        isUnlocked = stats.weightGoalReached === true;
        break;

      case "early_workout":
        isUnlocked = stats.hasEarlyWorkout === true;
        break;

      case "late_workout":
        isUnlocked = stats.hasLateWorkout === true;
        break;

      case "weekend_workouts":
        isUnlocked = stats.weekendWorkouts >= achievement.requirement;
        break;

      case "shares":
        isUnlocked = stats.totalShares >= achievement.requirement;
        break;
    }

    // Si se desbloqueó, agregarlo
    if (isUnlocked) {
      await unlockAchievement(userId, achievement);
      newAchievements.push(achievement);
    }
  }

  return newAchievements;
}

// ========================================
// DESBLOQUEAR LOGRO
// ========================================

async function unlockAchievement(userId, achievement) {
  try {
    const achievementRef = doc(
      db,
      "achievements",
      `${userId}_${achievement.id}`
    );

    await setDoc(achievementRef, {
      userId: userId,
      achievementId: achievement.id,
      name: achievement.name,
      description: achievement.description,
      icon: achievement.icon,
      points: achievement.points,
      rarity: achievement.rarity,
      unlockedAt: serverTimestamp(),
    });

    console.log(`🎉 Logro desbloqueado: ${achievement.name}`);

    // Actualizar puntos totales del usuario
    await updateUserPoints(userId, achievement.points);

    return true;
  } catch (error) {
    console.error("❌ Error al desbloquear logro:", error);
    return false;
  }
}

// ========================================
// OBTENER LOGROS DESBLOQUEADOS
// ========================================

export async function getUnlockedAchievements(userId) {
  try {
    const achievementsRef = collection(db, "achievements");
    const q = query(achievementsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    const achievements = [];
    snapshot.forEach((docSnap) => {
      achievements.push({
        id: docSnap.data().achievementId,
        ...docSnap.data(),
      });
    });

    console.log(`📊 Logros desbloqueados: ${achievements.length}`);
    return achievements;
  } catch (error) {
    console.error("❌ Error al obtener logros:", error);
    return [];
  }
}

// ========================================
// ACTUALIZAR PUNTOS DEL USUARIO
// ========================================

async function updateUserPoints(userId, points) {
  try {
    const userStatsRef = doc(db, "userStats", userId);
    const userStatsDoc = await getDoc(userStatsRef);

    if (userStatsDoc.exists()) {
      const currentPoints = userStatsDoc.data().totalPoints || 0;
      await updateDoc(userStatsRef, {
        totalPoints: currentPoints + points,
      });
    } else {
      await setDoc(userStatsRef, {
        totalPoints: points,
        currentStreak: 0,
        totalPRs: 0,
        totalVolume: 0,
        totalWorkouts: 0,
        uniqueExercises: 0,
        muscleGroupsTrained: 0,
        goalsCompleted: 0,
        weightGoalReached: false,
        hasEarlyWorkout: false,
        hasLateWorkout: false,
        weekendWorkouts: 0,
        totalShares: 0,
      });
    }

    console.log(`⭐ Puntos actualizados: +${points}`);
  } catch (error) {
    console.error("❌ Error al actualizar puntos:", error);
  }
}

// ========================================
// OBTENER ESTADÍSTICAS DEL USUARIO
// ========================================

export async function getUserStats(userId) {
  try {
    const userStatsRef = doc(db, "userStats", userId);
    const userStatsDoc = await getDoc(userStatsRef);

    if (userStatsDoc.exists()) {
      return userStatsDoc.data();
    } else {
      // Crear estadísticas iniciales
      const initialStats = {
        totalPoints: 0,
        currentStreak: 0,
        totalPRs: 0,
        totalVolume: 0,
        totalWorkouts: 0,
        uniqueExercises: 0,
        muscleGroupsTrained: 0,
        goalsCompleted: 0,
        weightGoalReached: false,
        hasEarlyWorkout: false,
        hasLateWorkout: false,
        weekendWorkouts: 0,
        totalShares: 0,
      };

      await setDoc(userStatsRef, initialStats);
      return initialStats;
    }
  } catch (error) {
    console.error("❌ Error al obtener stats:", error);
    return {
      totalPoints: 0,
      currentStreak: 0,
      totalPRs: 0,
      totalVolume: 0,
      totalWorkouts: 0,
      uniqueExercises: 0,
      muscleGroupsTrained: 0,
      goalsCompleted: 0,
      weightGoalReached: false,
      hasEarlyWorkout: false,
      hasLateWorkout: false,
      weekendWorkouts: 0,
      totalShares: 0,
    };
  }
}

// ========================================
// MOSTRAR CELEBRACIÓN DE LOGRO
// ========================================

export function showAchievementCelebration(achievement) {
  // Crear modal de celebración
  const modal = document.createElement("div");
  modal.className = "achievement-modal";
  modal.innerHTML = `
    <div class="achievement-celebration">
      <div class="celebration-confetti">
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
      </div>
      
      <div class="achievement-content">
        <div class="achievement-badge-large">
          <div class="badge-glow" style="background: ${
            RARITY_COLORS[achievement.rarity]
          }40;"></div>
          <div class="badge-icon">${achievement.icon}</div>
        </div>
        
        <h2 class="achievement-unlocked">¡Logro Desbloqueado!</h2>
        
        <h3 class="achievement-name" style="color: ${
          RARITY_COLORS[achievement.rarity]
        };">
          ${achievement.name}
        </h3>
        
        <p class="achievement-description">${achievement.description}</p>
        
        <div class="achievement-rarity" style="color: ${
          RARITY_COLORS[achievement.rarity]
        };">
          ${RARITY_NAMES[achievement.rarity]}
        </div>
        
        <div class="achievement-points">
          +${achievement.points} XP
        </div>
        
        <button class="btn-share-achievement" id="btnShareAchievement">
          📱 Compartir Logro
        </button>
        
        <button class="btn-close-achievement" onclick="this.closest('.achievement-modal').remove()">
          Continuar
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Animar entrada
  setTimeout(() => {
    modal.classList.add("active");
  }, 100);

  // Event listener para compartir
  const btnShare = modal.querySelector("#btnShareAchievement");
  if (btnShare) {
    btnShare.addEventListener("click", () => {
      shareAchievement(achievement);
    });
  }

  // Reproducir sonido (opcional)
  playAchievementSound();
}

// ========================================
// COMPARTIR LOGRO
// ========================================

export async function shareAchievement(achievement) {
  const shareText = `🏆 ¡Acabo de desbloquear "${
    achievement.name
  }" en ProTrainer!\n\n${achievement.description}\n\n+${
    achievement.points
  } XP | ${RARITY_NAMES[achievement.rarity]}\n\n#ProTrainer #Fitness #Logros`;

  // Si el navegador soporta Web Share API
  if (navigator.share) {
    try {
      await navigator.share({
        title: `Logro Desbloqueado: ${achievement.name}`,
        text: shareText,
        url: window.location.href,
      });

      // Incrementar contador de shares
      const user = auth.currentUser;
      if (user) {
        const statsRef = doc(db, "userStats", user.uid);
        const statsDoc = await getDoc(statsRef);

        if (statsDoc.exists()) {
          const currentShares = statsDoc.data().totalShares || 0;
          await updateDoc(statsRef, {
            totalShares: currentShares + 1,
          });
        }

        console.log("✅ Logro compartido y contador actualizado");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.log("❌ Error al compartir:", error);
      }
    }
  } else {
    // Fallback: copiar al portapapeles
    try {
      await navigator.clipboard.writeText(shareText);
      showToast("✅ Texto copiado al portapapeles", "success");
    } catch (error) {
      console.error("❌ Error al copiar:", error);
      showToast("❌ No se pudo copiar el texto", "error");
    }
  }
}

// ========================================
// REPRODUCIR SONIDO
// ========================================

function playAchievementSound() {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.log("🔇 Audio no disponible");
  }
}

// ========================================
// HELPER: MOSTRAR TOAST
// ========================================

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  if (toast && toastMessage) {
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove("hidden");

    setTimeout(() => {
      toast.classList.add("hidden");
    }, 3000);
  }
}

console.log("✅ achievements.js cargado");
