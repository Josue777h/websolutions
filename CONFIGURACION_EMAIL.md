# 📧 Configuración de Email para el Portafolio

## 🚀 Opciones Disponibles

### Opción 1: FormSubmit (Recomendada para empezar)
**Ventajas:**
- ✅ No requiere servidor PHP
- ✅ Fácil de configurar
- ✅ Gratuito
- ✅ Ya configurado en tu HTML

**Configuración actual:**
- Email destino: `josuesepulvedassj@gmail.com`
- Página de agradecimiento: `gracias.html`
- Respuesta automática activada

**Para activar:**
1. El formulario ya está configurado
2. Solo necesitas subir tu sitio a cualquier hosting
3. FormSubmit funcionará automáticamente

---

### Opción 2: PHP Personalizado (Más robusta)
**Ventajas:**
- ✅ Control total sobre el proceso
- ✅ Emails HTML personalizados
- ✅ Respuesta automática al usuario
- ✅ Validaciones personalizadas
- ✅ Mejor presentación de los emails

**Archivos creados:**
- `contact.php` - Procesador de formulario
- `gracias.html` - Página de agradecimiento
- `form-ajax.js` - Versión AJAX del formulario

**Para usar esta opción:**
1. Cambiar el formulario en `index.html`:
```html
<form action="contact.php" method="POST" class="contact-form">
```

2. Incluir el script AJAX en `index.html`:
```html
<script src="form-ajax.js"></script>
```

3. Subir todos los archivos a un servidor con PHP

---

## 🔧 Configuración por Hosting

### Netlify (Gratuito)
- Usar FormSubmit (Opción 1)
- Subir archivos estáticos
- Funciona inmediatamente

### Vercel (Gratuito)
- Usar FormSubmit (Opción 1)
- Subir archivos estáticos
- Funciona inmediatamente

### GitHub Pages (Gratuito)
- Usar FormSubmit (Opción 1)
- Solo archivos estáticos
- Funciona inmediatamente

### Hosting con PHP (Pagado)
- Usar PHP personalizado (Opción 2)
- Mayor control y personalización
- Emails más profesionales

---

## 📝 Instrucciones de Uso

### Para FormSubmit (Opción 1):
1. Subir `index.html`, `style.css`, `script.js` y `gracias.html` a tu hosting
2. El formulario funcionará automáticamente
3. Los emails llegarán a `josuesepulvedassj@gmail.com`

### Para PHP (Opción 2):
1. Subir todos los archivos incluyendo `contact.php` a un servidor PHP
2. Cambiar el formulario para usar `contact.php`
3. Incluir `form-ajax.js` para mejor experiencia

---

## 🎨 Personalización de Emails

Los emails que recibirás incluirán:
- ✅ Nombre del contacto
- ✅ Email para responder
- ✅ Asunto seleccionado
- ✅ Mensaje completo
- ✅ Fecha y hora del envío
- ✅ Formato HTML profesional

---

## 🛠️ Solución de Problemas

### Si no llegan emails:
1. Verificar que el email `josuesepulvedassj@gmail.com` esté correcto
2. Revisar la carpeta de spam
3. Para FormSubmit: verificar que el sitio esté online
4. Para PHP: verificar que el servidor tenga mail() habilitado

### Para cambiar el email destino:
1. En FormSubmit: cambiar en el action del formulario
2. En PHP: cambiar la variable `$to` en `contact.php`

---

## 📞 Soporte

Si necesitas ayuda con la configuración, puedes:
1. Revisar los archivos creados
2. Probar primero con FormSubmit (más fácil)
3. Migrar a PHP cuando tengas un servidor adecuado

¡Tu sistema de contacto está listo para funcionar! 🎉
