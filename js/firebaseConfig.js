/**
 * ========================================
 * FIREBASE CONFIGURATION
 * ========================================
 * Archivo de configuración para Firebase
 * Reemplazá los valores con tu configuración real
 * desde Firebase Console
 */

// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * Configuración de Firebase
 * IMPORTANTE: Reemplazá estos valores con los de tu proyecto
 * Para obtener esta configuración:
 * 1. Andá a Firebase Console (https://console.firebase.google.com)
 * 2. Creá un proyecto o seleccioná uno existente
 * 3. Agregá una Web App
 * 4. Copiá la configuración y pegala aquí
 */
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

// Inicializar servicios
const auth = getAuth(app);
const db = getFirestore(app);

// Exportar para usar en otros archivos
export { auth, db };
