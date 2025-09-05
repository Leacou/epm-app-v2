# EPM App v2

Automatiza la obtención y análisis de métricas de Instagram, visualiza dashboards interactivos y accede a mentoría especializada en marketing mediante IA.

## Objetivo

EPM App v2 permite a agencias y emprendedores conectar sus cuentas de Instagram, visualizar métricas clave, exportar reportes a Google Sheets y acceder a un chatbot de mentoría en marketing digital basado en IA (Gemini AI). La plataforma integra automatización, analítica y asesoramiento inteligente en un mismo flujo.

---

## Stack tecnológico

- **Frontend:** React + Vite + MUI (Material UI)
- **Backend/Integraciones:** Node.js, Google App Script (webhook para Sheets)
- **API:** Facebook/Instagram Graph API (OAuth2, insights, datos de perfil)
- **Inteligencia Artificial:** Gemini AI (integrado vía epm-mentoria)
- **Chatbot:** epm-mentoria (https://github.com/Leacou/epm-mentoria)
- **Automatización:** Google Sheets vía App Script

---

## Arquitectura e Integración

- **Login OAuth2:** Autenticación con Facebook/Instagram, obtención de token y perfil.
- **Dashboard:** Visualización de métricas y estadísticas de Instagram.
- **Exportación:** Reportes automáticos a Google Sheets usando un webhook de App Script.
- **Mentoría AI:** Integración con [epm-mentoria](https://github.com/Leacou/epm-mentoria) mediante intercambio de tokens y parámetros UTM para transferir datos de usuario entre apps.
- **Flujo seguro:** El login de Meta requiere redirect URI en producción; no funciona en localhost.

---

## Funcionalidades principales

- Login seguro con Facebook/Instagram
- Dashboard analítico con métricas de seguidores, engagement y actividad
- Exportación de datos a Google Sheets
- Chatbot mentor en marketing digital (IA Gemini)
- Automatización de reportes y sugerencias personalizadas
- Integración entre apps mediante parámetros y tokens

---

## Ventajas en AI Ops & Automation

- **Automatización:** El usuario no necesita analizar manualmente; los reportes y métricas se generan y exportan automáticamente.
- **AI Integrada:** El chatbot mentor ofrece sugerencias, estrategias y asesoramiento personalizado usando inteligencia artificial.
- **Interoperabilidad:** Vinculación entre apps (epm-app-v2 y epm-mentoria) y herramientas externas (Google Sheets) mediante APIs y webhooks.
- **Seguridad:** Uso de OAuth2 y tokens de acceso gestionados dinámicamente.

---

## Instalación y uso

### Prerrequisitos

1. **App en Meta Developers**
   - Registra una nueva App en [Meta Developers](https://developers.facebook.com/)
   - Solicita permisos avanzados:  
     `public_profile`, `email`, `instagram_basic`, `instagram_manage_insights`
   - Configura los "Redirect URI" en modo producción (no se permite localhost para login de usuario).

2. **Clona los repositorios**
   ```sh
   git clone https://github.com/Leacou/epm-app-v2.git
   git clone https://github.com/Leacou/epm-mentoria.git
   ```

3. **Instala dependencias**
   ```sh
   cd epm-app-v2/frontend
   npm install
   ```

### Variables de entorno

- Configura los valores de tu app de Meta Developers en `.env` si corresponde:
  ```
  VITE_FACEBOOK_APP_ID=tu_app_id
  VITE_FACEBOOK_REDIRECT_URI=tu_redirect_uri
  ```

### Ejecución

> **Nota:** El login requiere que la app esté desplegada en producción con el dominio registrado en Meta Developers.

1. Despliega la app en un entorno público (por ejemplo, Render, Vercel, Netlify).
2. Accede al frontend y realiza el login con Facebook/Instagram.
3. Visualiza métricas, exporta reportes y accede al chatbot de mentoría.

---

## Integración con epm-mentoria

- El chatbot mentor está alojado en [epm-mentoria](https://github.com/Leacou/epm-mentoria).
- Se accede mediante redirección y parámetros UTM que transfieren datos del usuario autenticado (ID, nombre, imagen de perfil y token).
- El flujo es transparente para el usuario y mantiene la sesión y la seguridad.

---

## Contacto y contribuciones

¿Quieres colaborar o necesitas ayuda?  
- Abre un issue en este repositorio.
- Contacto: [leacou@gmail.com](mailto:leacou@gmail.com)


---
