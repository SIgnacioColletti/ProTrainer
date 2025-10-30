# 🧪 CHECKLIST DE TESTING - ProTrainer

## ✅ Testing en Móvil (Android)

### Pantalla de Inicio
- [ ] Logo y eslogan se muestran correctamente
- [ ] Botones "Iniciar sesión" y "Registrarse" funcionan
- [ ] Diseño responsive en diferentes tamaños de pantalla
- [ ] Animaciones se ejecutan suavemente

### Registro
- [ ] Validación de campos funciona
- [ ] Mensajes de error son claros
- [ ] Registro exitoso redirige al dashboard
- [ ] Email de verificación se envía (opcional)

### Login
- [ ] Login con credenciales correctas funciona
- [ ] Mensajes de error para credenciales incorrectas
- [ ] Botón "Olvidé mi contraseña" funciona
- [ ] Redirección automática si ya está logueado

### Dashboard
- [ ] Nombre de usuario se muestra correctamente
- [ ] Estadísticas cargan desde Firestore
- [ ] Tarjetas son responsive
- [ ] Navegación inferior funciona
- [ ] Logout cierra sesión correctamente

### Rutinas
- [ ] Crear nueva rutina guarda en Firestore
- [ ] Lista de rutinas se actualiza en tiempo real
- [ ] Editar rutina modifica correctamente
- [ ] Eliminar rutina pide confirmación
- [ ] Validación de campos numéricos

### Progreso
- [ ] Formulario de peso/medidas funciona
- [ ] Gráfico se genera con Chart.js
- [ ] Datos históricos se muestran correctamente
- [ ] Scroll del gráfico es suave

### Perfil
- [ ] Campos editables se guardan
- [ ] Toggle de modo claro/oscuro funciona
- [ ] Cambios se sincronizan con Firestore
- [ ] Avatar/foto funciona (si implementado)

## ✅ Testing en Móvil (iPhone)

- [ ] Safari muestra todo correctamente
- [ ] Animaciones CSS funcionan
- [ ] Touch events responden bien
- [ ] Teclado no tapa inputs
- [ ] No hay scroll horizontal no deseado

## ✅ Testing en Tablet

- [ ] Layout se adapta a pantalla más grande
- [ ] Grid de 2-3 columnas funciona
- [ ] Navegación sigue siendo intuitiva

## ✅ Testing en Desktop

- [ ] Max-width mantiene diseño centrado
- [ ] Hover states funcionan correctamente
- [ ] Keyboard navigation funciona
- [ ] Responsive breakpoints correctos

## ✅ Testing de Firebase

- [ ] Authentication funciona correctamente
- [ ] Firestore guarda y lee datos
- [ ] Reglas de seguridad están configuradas
- [ ] Offline persistence funciona
- [ ] Datos se sincronizan al reconectar

## ✅ Performance

- [ ] Tiempo de carga < 3 segundos
- [ ] Animaciones a 60fps
- [ ] No hay memory leaks
- [ ] Imágenes optimizadas
- [ ] CSS y JS minificados (producción)

## ✅ Accesibilidad

- [ ] Navegación con teclado funciona
- [ ] Etiquetas ARIA donde corresponde
- [ ] Contraste de colores adecuado
- [ ] Focus visible en elementos

## ✅ Seguridad

- [ ] Inputs sanitizados contra XSS
- [ ] Reglas de Firestore protegen datos
- [ ] No hay API keys expuestas en frontend
- [ ] HTTPS habilitado en producción