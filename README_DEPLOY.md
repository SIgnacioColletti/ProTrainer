// ============================================
// ARCHIVO: README_DEPLOY.md
// ============================================

# 🚀 ProTrainer - Guía de Deployment

## 📋 Pre-requisitos

1. **Node.js y npm instalados**

   - Descargar de: https://nodejs.org/
   - Verificar: `node --version` y `npm --version`

2. **Firebase CLI instalado**

```bash
   npm install -g firebase-tools
```

3. **Cuenta de Firebase**
   - Crear proyecto en: https://console.firebase.google.com/

---

## 🔧 Configuración Inicial

### 1. Inicializar Firebase

```bash
# Login a Firebase
firebase login

# Inicializar proyecto (ya está hecho)
firebase init
```

Seleccionar:

- ✅ Hosting
- ✅ Firestore
- ✅ Authentication

### 2. Configurar firebase.json

El archivo `firebase.json` ya está configurado con:

- Rewrites para SPA
- Headers de caché optimizados
- Public directory: `.` (raíz del proyecto)

### 3. Actualizar .firebaserc

Editar `.firebaserc` y reemplazar `tu-proyecto-id` con tu ID real de Firebase.

---

## 🎨 Generar Íconos PWA

### Opción 1: Online (Recomendado)

1. Ir a: https://realfavicongenerator.net/
2. Subir logo de 512x512px con fondo transparente
3. Configurar:
   - Background color: `#000000`
   - Theme color: `#00FF88`
4. Descargar y extraer en carpeta `/icons/`

### Opción 2: Manual con ImageMagick

```bash
# Instalar ImageMagick
# Mac: brew install imagemagick
# Ubuntu: sudo apt-get install imagemagick

# Generar todos los tamaños
convert logo.png -resize 72x72 icons/icon-72x72.png
convert logo.png -resize 96x96 icons/icon-96x96.png
convert logo.png -resize 128x128 icons/icon-128x128.png
convert logo.png -resize 144x144 icons/icon-144x144.png
convert logo.png -resize 152x152 icons/icon-152x152.png
convert logo.png -resize 192x192 icons/icon-192x192.png
convert logo.png -resize 384x384 icons/icon-384x384.png
convert logo.png -resize 512x512 icons/icon-512x512.png
```

---

## 📱 Agregar Meta Tags PWA

Agregar en `<head>` de **TODOS** los archivos HTML:

```html
<!-- PWA Meta Tags -->
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#00FF88" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta
  name="apple-mobile-web-app-status-bar-style"
  content="black-translucent"
/>
<meta name="apple-mobile-web-app-title" content="ProTrainer" />

<!-- Icons -->
<link
  rel="icon"
  type="image/png"
  sizes="192x192"
  href="/icons/icon-192x192.png"
/>
<link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />

<!-- PWA Scripts -->
<script src="/js/pwa-installer.js" defer></script>
<link rel="stylesheet" href="/css/pwa-styles.css" />
```

---

## 🚀 Deployment

### 1. Verificar estructura de archivos

```
protrainer/
├── index.html
├── manifest.json
├── service-worker.js
├── firebase.json
├── .firebaserc
├── pages/
│   ├── auth.html
│   ├── dashboard.html
│   ├── routines.html
│   ├── progress.html
│   ├── profile.html
│   ├── calculators.html
│   └── analytics.html
├── css/
│   ├── styles.css
│   ├── pwa-styles.css
│   └── ... (otros CSS)
├── js/
│   ├── firebaseConfig.js
│   ├── pwa-installer.js
│   └── ... (otros JS)
└── icons/
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-192x192.png
    └── icon-512x512.png
```

### 2. Testing Local

```bash
# Servir localmente
firebase serve

# Abrir en navegador
http://localhost:5000
```

### 3. Deploy a Firebase Hosting

```bash
# Deploy
firebase deploy

# Solo hosting
firebase deploy --only hosting

# Con mensaje
firebase deploy -m "Primera versión de ProTrainer"
```

### 4. Verificar Deploy

Después del deploy, Firebase mostrará:

```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/tu-proyecto/overview
Hosting URL: https://tu-proyecto.web.app
```

---

## ✅ Checklist Post-Deploy

- [ ] Verificar que la app carga en la URL de hosting
- [ ] Probar login/registro
- [ ] Crear una rutina de prueba
- [ ] Verificar gráficos en Analytics
- [ ] Probar instalación PWA en móvil:
  - Chrome: Menú → "Instalar app"
  - Safari iOS: Compartir → "Añadir a pantalla de inicio"
- [ ] Verificar que funciona offline (sin internet)
- [ ] Probar notificación de actualización

---

## 🔄 Actualizar la App

```bash
# 1. Hacer cambios en el código

# 2. Actualizar versión en service-worker.js
const CACHE_NAME = 'protrainer-v1.0.1'; // Incrementar versión

# 3. Deploy
firebase deploy

# 4. Los usuarios verán notificación de actualización automáticamente
```

---

## 🐛 Troubleshooting

### Error: "Firebase config not found"

- Verificar que `firebaseConfig.js` tenga las credenciales correctas
- Obtener config en: Firebase Console → Project Settings → General

### Error: "Service Worker registration failed"

- Verificar que `service-worker.js` esté en la raíz
- Comprobar ruta en consola del navegador
- Limpiar caché: DevTools → Application → Clear storage

### PWA no se instala en móvil

- Verificar que `manifest.json` sea válido: https://manifest-validator.appspot.com/
- Confirmar que todos los íconos existen
- Verificar que el sitio esté en HTTPS (Firebase Hosting lo hace automático)

### Cambios no se reflejan

- Limpiar caché del navegador
- Incrementar versión en `service-worker.js`
- Hacer hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

---

## 📊 Analytics (Opcional)

Para agregar Google Analytics:

1. Ir a: https://analytics.google.com/
2. Crear propiedad
3. Obtener Measurement ID
4. Agregar en `<head>`:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX");
</script>
```

---

## 🎉 ¡Listo!

Tu app ProTrainer ahora es:

- ✅ Progressive Web App
- ✅ Instalable en móviles
- ✅ Funciona offline
- ✅ Se actualiza automáticamente
- ✅ Optimizada para rendimiento

**URL de producción:** https://tu-proyecto.web.app

---

## 📝 Comandos útiles

```bash
# Ver logs
firebase hosting:channel:list

# Rollback a versión anterior
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID TARGET_SITE_ID:live

# Ver uso
firebase hosting:channel:deploy preview

# Eliminar canal de preview
firebase hosting:channel:delete CHANNEL_ID
```

```

---

## 📂 ESTRUCTURA FINAL DE ARCHIVOS
```

protrainer/
│
├── 📄 index.html (raíz)
├── 📄 manifest.json (raíz)
├── 📄 service-worker.js (raíz)
├── 📄 firebase.json (raíz)
├── 📄 .firebaserc (raíz)
├── 📄 README_DEPLOY.md (raíz)
│
├── 📁 pages/
│ ├── auth.html
│ ├── dashboard.html
│ ├── routines.html
│ ├── progress.html
│ ├── profile.html
│ ├── calculators.html
│ └── analytics.html
│
├── 📁 css/
│ ├── styles.css
│ ├── auth.css
│ ├── dashboard.css
│ ├── routines.css
│ ├── progress.css
│ ├── profile.css
│ ├── calculators.css
│ ├── analytics.css
│ ├── achievements.css
│ └── pwa-styles.css (NUEVO)
│
├── 📁 js/
│ ├── firebaseConfig.js
│ ├── script.js
│ ├── auth.js
│ ├── dashboard.js
│ ├── routines.js
│ ├── progress.js
│ ├── profile.js
│ ├── calculators.js
│ ├── analytics.js
│ ├── achievements.js
│ ├── achievementsData.js
│ ├── profileAchievements.js
│ └── pwa-installer.js (NUEVO)
│
└── 📁 icons/ (NUEVA CARPETA)
├── icon-72x72.png
├── icon-96x96.png
├── icon-128x128.png
├── icon-144x144.png
├── icon-152x152.png
├── icon-192x192.png
├── icon-384x384.png
└── icon-512x512.png
