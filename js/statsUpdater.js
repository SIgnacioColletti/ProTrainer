// ============================================
// ARCHIVO: js/statsUpdater.js
// ============================================

import { db } from "./firebaseConfig.js";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ========================================
// ACTUALIZAR DESPUÉS DE ENTRENAMIENTO
// ========================================

export async function updateStatsAfterWorkout(userId, workoutData) {
  try {
    const statsRef = doc(db, "userStats", userId);

    // Calcular volumen total del entrenamiento
    const totalVolume = workoutData.exercises.reduce((sum, exercise) => {
      return sum + exercise.sets * exercise.reps * exercise.weight;
    }, 0);

    // Obtener hora del entrenamiento
    const workoutHour = new Date().getHours();
    const isEarly = workoutHour < 7;
    const isLate = workoutHour >= 22;
    const isWeekend = [0, 6].includes(new Date().getDay());

    // Actualizar estadísticas
    const updates = {
      totalWorkouts: increment(1),
      totalVolume: increment(totalVolume),
      currentStreak: increment(1), // Simplificado, debería verificar días consecutivos
    };

    if (isEarly) updates.hasEarlyWorkout = true;
    if (isLate) updates.hasLateWorkout = true;
    if (isWeekend) updates.weekendWorkouts = increment(1);

    await updateDoc(statsRef, updates);

    console.log("✅ Estadísticas actualizadas");
  } catch (error) {
    console.error("❌ Error al actualizar stats:", error);
  }
}

// ========================================
// ACTUALIZAR EJERCICIOS ÚNICOS
// ========================================

export async function updateUniqueExercises(userId, exerciseName) {
  try {
    const statsRef = doc(db, "userStats", userId);
    const statsDoc = await getDoc(statsRef);

    if (statsDoc.exists()) {
      const uniqueExercisesList = statsDoc.data().uniqueExercisesList || [];

      if (!uniqueExercisesList.includes(exerciseName)) {
        uniqueExercisesList.push(exerciseName);

        await updateDoc(statsRef, {
          uniqueExercisesList: uniqueExercisesList,
          uniqueExercises: uniqueExercisesList.length,
        });

        console.log(`✅ Nuevo ejercicio único: ${exerciseName}`);
      }
    }
  } catch (error) {
    console.error("❌ Error al actualizar ejercicios únicos:", error);
  }
}

// ========================================
// REGISTRAR PR (PERSONAL RECORD)
// ========================================

export async function registerPR(userId) {
  try {
    const statsRef = doc(db, "userStats", userId);

    await updateDoc(statsRef, {
      totalPRs: increment(1),
    });

    console.log("🎯 PR registrado");
  } catch (error) {
    console.error("❌ Error al registrar PR:", error);
  }
}

console.log("✅ statsUpdater.js cargado");
