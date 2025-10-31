// ============================================
// ARCHIVO: js/firebaseConfig.js
// ============================================

/**
 * ========================================
 * CONFIGURACIÓN DE FIREBASE
 * ========================================
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ========================================
// CONFIGURACIÓN (reemplazar con tus datos)
// ========================================
const firebaseConfig = {
  apiKey: "AIzaSyDmrq9We97CPsOIZwviSMV5-K1R2lcdW9M",
  authDomain: "protrainer-27b8c.firebaseapp.com",
  projectId: "protrainer-27b8c",
  storageBucket: "protrainer-27b8c.firebasestorage.app",
  messagingSenderId: "762894785253",
  appId: "1:762894785253:web:bf90d3c4faee086cf1120c",
  measurementId: "G-0JFGYTG2X6",
};

// ========================================
// INICIALIZACIÓN
// ========================================
let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  console.log("🔥 Firebase inicializado correctamente");
  console.log("✅ Auth:", auth ? "OK" : "ERROR");
  console.log("✅ Firestore:", db ? "OK" : "ERROR");
} catch (error) {
  console.error("❌ Error al inicializar Firebase:", error);
}

// ========================================
// EXPORTS
// ========================================
export { auth, db };
