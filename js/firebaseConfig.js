// ============================================
// ARCHIVO: js/firebaseConfig.js
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDmrq9We97CPsOIZwviSMV5-K1R2lcdW9M",
  authDomain: "protrainer-27b8c.firebaseapp.com",
  projectId: "protrainer-27b8c",
  storageBucket: "protrainer-27b8c.firebasestorage.app",
  messagingSenderId: "762894785253",
  appId: "1:762894785253:web:bf90d3c4faee086cf1120c",
  measurementId: "G-0JFGYTG2X6",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener servicios
const auth = getAuth(app);
const db = getFirestore(app);

// Verificación
console.log("🔥 Firebase App inicializada:", app);
console.log("🔐 Auth inicializado:", auth);
console.log("📊 Firestore inicializado:", db);

// Exportar
export { auth, db };
