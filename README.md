# 💪 ProTrainer - Tu Entrenador Personal de Gimnasio

![ProTrainer Banner](https://img.shields.io/badge/ProTrainer-Entrená.%20Superate.%20LevelUp-00FF88?style=for-the-badge)

[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/tuusuario/protrainer)

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Demo](#-demo)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Configuración](#%EF%B8%8F-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Autor](#-autor)
- [Agradecimientos](#-agradecimientos)

---

## 🎯 Descripción

**ProTrainer** es una Progressive Web App (PWA) completa para el seguimiento de entrenamientos de gimnasio. Permite a los usuarios gestionar rutinas, registrar progreso, visualizar estadísticas avanzadas y desbloquear logros mediante gamificación.

### ✨ ¿Por qué ProTrainer?

- 🚀 **100% Gratuita** - Sin suscripciones ni pagos ocultos
- 📱 **Funciona Offline** - Entrena sin conexión a internet
- 🎨 **Diseño Moderno** - Interfaz intuitiva y atractiva
- 📊 **Analytics Avanzados** - Visualiza tu progreso con gráficos profesionales
- 🏆 **Gamificación** - Sistema de logros y puntos de experiencia
- 🔒 **Privacidad** - Tus datos son 100% tuyos

---

## 🚀 Características

### 🔐 Autenticación
- Registro e inicio de sesión con email/contraseña
- Recuperación de contraseña
- Sesiones persistentes

### 💪 Gestión de Rutinas
- Crear, editar y eliminar rutinas personalizadas
- Agregar múltiples ejercicios con series, repeticiones y peso
- Biblioteca de 50+ ejercicios pre-cargados
- Plantillas profesionales (Push/Pull/Legs, Full Body, etc.)

### 📈 Seguimiento de Progreso
- Registro de peso corporal
- Gráficos de evolución (Chart.js)
- Histórico completo de entrenamientos
- Cálculo automático de volumen total

### ⏱️ Modo Entrenamiento
- Temporizador de descanso con presets
- Cronómetro de sesión
- Marcado de series completadas
- Guardado automático

### 🧮 Calculadoras Fitness
- **1RM (Repetición Máxima)** - 4 fórmulas diferentes
- **TDEE y Macros** - Calorías y distribución de macronutrientes
- **Grasa Corporal** - Método US Navy
- **Progresión de Carga** - Planificación de aumentos
- **Calculadora de Discos** - Visualización de barra olímpica

### 🏆 Sistema de Logros
- 50+ badges desbloqueables
- Categorías: Constancia, PRs, Volumen, Entrenamientos, Explorador
- 4 niveles de rareza: Común, Raro, Épico, Legendario
- Sistema de puntos (XP)
- Barras de progreso

### 📊 Analytics Avanzados
- Dashboard completo de métricas
- Gráfico de frecuencia de entrenamiento
- Volumen por grupo muscular
- Progresión de fuerza por ejercicio
- Heatmap estilo GitHub
- Insights automáticos
- Día favorito de entrenamiento

### 👤 Perfil Personalizado
- Edición de datos personales
- Configuración de objetivos
- Modo claro/oscuro
- Galería de logros

### 📱 PWA (Progressive Web App)
- Instalable en móviles (Android/iOS)
- Funciona offline
- Notificaciones de actualización
- Caché inteligente
- Splash screen personalizada

---

## 🎬 Demo

🔗 **[Ver Demo en Vivo](https://tu-proyecto.web.app)**

> **Usuario de prueba:**
> - Email: `demo@protrainer.com`
> - Contraseña: `Demo123456`

---

## 📸 Capturas de Pantalla

### 🏠 Dashboard
![Dashboard](screenshots/dashboard.png)

### 💪 Rutinas
![Rutinas](screenshots/routines.png)

### 📊 Analytics
![Analytics](screenshots/analytics.png)

### 🏆 Logros
![Logros](screenshots/achievements.png)

---

## 🛠️ Tecnologías

### Frontend
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

### Backend & Database
- ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)
  - Authentication
  - Firestore Database
  - Hosting

### Librerías
- [Chart.js](https://www.chartjs.org/) - Gráficos interactivos
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) - PWA offline

### Fuentes
- [Google Fonts](https://fonts.google.com/) - Montserrat & Poppins

---

## 📦 Instalación

### Pre-requisitos
```bash
# Node.js y npm (recomendado v16+)
node --version
npm --version

# Firebase CLI
npm install -g firebase-tools
```

### Clonar Repositorio
```bash
git clone https://github.com/tuusuario/protrainer.git
cd protrainer
```

### Estructura de Carpetas
```
protrainer/
├── index.html
├── manifest.json
├── service-worker.js
├── pages/
│   ├── auth.html
│   ├── dashboard.html
│   ├── routines.html
│   ├── progress.html
│   ├── profile.html
│   ├── calculators.html
│   └── analytics.html
├── css/
│   └── (todos los estilos)
├── js/
│   └── (toda la lógica)
└── icons/
    └── (íconos PWA)
```

---

## ⚙️ Configuración

### 1. Crear Proyecto en Firebase

1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear nuevo proyecto
3. Habilitar **Authentication** (Email/Password)
4. Crear base de datos **Firestore**
5. Habilitar **Hosting**

### 2. Obtener Credenciales

En Firebase Console → Project Settings → General:
```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### 3. Configurar js/firebaseConfig.js
```javascript
// Reemplazar con tus credenciales
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  // TUS CREDENCIALES AQUÍ
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### 4. Configurar Reglas de Firestore

En Firebase Console → Firestore Database → Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    match /users/{userId} {
      allow read, write: if isOwner(userId);
    }
    
    match /routines/{routineId} {
      allow create: if isSignedIn() && 
                       request.resource.data.userId == request.auth.uid;
      allow read, update, delete: if isSignedIn() && 
                                      resource.data.userId == request.auth.uid;
    }
    
    match /progress/{progressId} {
      allow create: if isSignedIn() && 
                       request.resource.data.userId == request.auth.uid;
      allow read, delete: if isSignedIn() && 
                             resource.data.userId == request.auth.uid;
    }
    
    match /achievements/{achievementId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn() && 
                       request.resource.data.userId == request.auth.uid;
      allow update, delete: if isSignedIn() && 
                               resource.data.userId == request.auth.uid;
    }
    
    match /userStats/{userId} {
      allow read, write: if isOwner(userId);
    }
  }
}
```

### 5. Generar Íconos PWA

Opción 1: Usar generador online
- Ir a [RealFaviconGenerator](https://realfavicongenerator.net/)
- Subir logo 512x512px
- Configurar colores: `#000000` (fondo) y `#00FF88` (tema)
- Descargar y extraer en `/icons/`

Opción 2: Con ImageMagick
```bash
convert logo.png -resize 72x72 icons/icon-72x72.png
convert logo.png -resize 96x96 icons/icon-96x96.png
convert logo.png -resize 192x192 icons/icon-192x192.png
convert logo.png -resize 512x512 icons/icon-512x512.png
```

---

## 🎮 Uso

### Desarrollo Local
```bash
# Servir localmente con Firebase
firebase serve

# O usar Live Server en VS Code
# Abrir index.html con Live Server
```

Navegar a: `http://localhost:5000`

### Testing

1. **Crear cuenta**
   - Ir a página de registro
   - Ingresar email y contraseña
   - Confirmar registro

2. **Crear rutina**
   - Dashboard → Rutinas → Crear Rutina
   - Agregar ejercicios con series y peso
   - Guardar

3. **Registrar entrenamiento**
   - Seleccionar rutina → Iniciar Entrenamiento
   - Marcar series completadas
   - Finalizar sesión

4. **Ver progreso**
   - Dashboard → Progreso
   - Agregar registro de peso
   - Ver gráficos

5. **Explorar calculadoras**
   - Dashboard → Calculadoras
   - Probar cada calculadora

6. **Verificar analytics**
   - Dashboard → Analytics
   - Explorar métricas e insights

---

## 📁 Estructura del Proyecto
```
protrainer/
│
├── 📄 index.html                    # Landing page
├── 📄 manifest.json                 # PWA manifest
├── 📄 service-worker.js             # Service Worker
├── 📄 firebase.json                 # Config Firebase Hosting
├── 📄 .firebaserc                   # Project ID
│
├── 📁 pages/
│   ├── auth.html                    # Login/Registro
│   ├── dashboard.html               # Panel principal
│   ├── routines.html                # Gestión de rutinas
│   ├── progress.html                # Seguimiento
│   ├── profile.html                 # Perfil + Logros
│   ├── calculators.html             # Calculadoras
│   └── analytics.html               # Analytics avanzados
│
├── 📁 css/
│   ├── styles.css                   # Estilos globales
│   ├── auth.css                     # Estilos auth
│   ├── dashboard.css                # Estilos dashboard
│   ├── routines.css                 # Estilos rutinas
│   ├── progress.css                 # Estilos progreso
│   ├── profile.css                  # Estilos perfil
│   ├── calculators.css              # Estilos calculadoras
│   ├── analytics.css                # Estilos analytics
│   ├── achievements.css             # Estilos logros
│   └── pwa-styles.css               # Estilos PWA
│
├── 📁 js/
│   ├── firebaseConfig.js            # Config Firebase
│   ├── script.js                    # Lógica global
│   ├── auth.js                      # Autenticación
│   ├── dashboard.js                 # Dashboard
│   ├── routines.js                  # Rutinas
│   ├── progress.js                  # Progreso
│   ├── profile.js                   # Perfil
│   ├── calculators.js               # Calculadoras
│   ├── analytics.js                 # Analytics
│   ├── achievements.js              # Sistema logros
│   ├── achievementsData.js          # Data logros
│   ├── profileAchievements.js       # Logros en perfil
│   └── pwa-installer.js             # PWA installer
│
└── 📁 icons/
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-192x192.png
    └── icon-512x512.png
```

---

## 🚀 Deployment

### Firebase Hosting
```bash
# 1. Login a Firebase
firebase login

# 2. Inicializar (si no está hecho)
firebase init

# 3. Deploy
firebase deploy

# 4. Deploy solo hosting
firebase deploy --only hosting
```

### Netlify (Alternativa)
```bash
# 1. Instalar CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Deploy
netlify deploy --prod
```

### Vercel (Alternativa)
```bash
# 1. Instalar CLI
npm install -g vercel

# 2. Deploy
vercel
```

---

## 🗺️ Roadmap

### v1.1.0 (Q1 2025)
- [ ] Integración con wearables (Apple Watch, Fitbit)
- [ ] Compartir rutinas con otros usuarios
- [ ] Chat entre usuarios
- [ ] Modo entrenador (para profesionales)

### v1.2.0 (Q2 2025)
- [ ] Planes de entrenamiento automatizados con IA
- [ ] Reconocimiento de voz para registrar series
- [ ] Integración con YouTube (tutoriales de ejercicios)
- [ ] Modo competitivo (desafíos semanales)

### v2.0.0 (Q3 2025)
- [ ] App nativa (React Native)
- [ ] Sincronización con Google Fit / Apple Health
- [ ] Nutrición y recetas
- [ ] Marketplace de rutinas premium

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! 

### Proceso

1. Fork el proyecto
2. Crear branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add: nueva característica'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### Guía de Estilo

- **Commits:** Usar [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat:` nueva característica
  - `fix:` corrección de bug
  - `docs:` documentación
  - `style:` formato/estilo
  - `refactor:` refactorización
  - `test:` tests
  - `chore:` mantenimiento

- **Código:**
  - JavaScript ES6+
  - Nombres de variables en español
  - Comentarios concisos
  - Funciones documentadas

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
```
MIT License

Copyright (c) 2025 Tu Nombre

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👨‍💻 Autor

**Tu Nombre**

- GitHub: [@tuusuario](https://github.com/tuusuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tuusuario)
- Email: tuemail@ejemplo.com
- Portfolio: [tuportfolio.com](https://tuportfolio.com)

---

## 🙏 Agradecimientos

- [Firebase](https://firebase.google.com/) por la infraestructura
- [Chart.js](https://www.chartjs.org/) por los gráficos
- [Google Fonts](https://fonts.google.com/) por las tipografías
- [MDN Web Docs](https://developer.mozilla.org/) por la documentación
- [ChatGPT](https://chat.openai.com/) por la asistencia en desarrollo
- A la comunidad fitness por la inspiración

---

## 📊 Estadísticas

![GitHub stars](https://img.shields.io/github/stars/tuusuario/protrainer?style=social)
![GitHub forks](https://img.shields.io/github/forks/tuusuario/protrainer?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/tuusuario/protrainer?style=social)

---

## 🔗 Links Útiles

- 📱 [Demo en Vivo](https://tu-proyecto.web.app)
- 📚 [Documentación Completa](https://github.com/tuusuario/protrainer/wiki)
- 🐛 [Reportar Bug](https://github.com/tuusuario/protrainer/issues)
- 💡 [Sugerir Feature](https://github.com/tuusuario/protrainer/issues/new)
- 💬 [Discussions](https://github.com/tuusuario/protrainer/discussions)

---

<div align="center">

**Hecho con 💪 y ☕ por [Tu Nombre](https://github.com/tuusuario)**

⭐ Si te gusta ProTrainer, ¡dale una estrella! ⭐

</div>
