# ItachiPeru — Gestión de Suscripciones 🎌

Panel de administración para gestionar suscripciones de clientes a plataformas de streaming, música, IA y productividad.

## ✨ Características

- 📊 **Dashboard** — Resumen con alertas de vencimientos, ingresos y estadísticas
- 🔄 **Suscripciones** — Registro completo con estado, vencimiento y precio por cliente
- 👥 **Clientes** — Base de datos con WhatsApp, correo y historial de suscripciones
- 📅 **Calendario** — Vista mensual de todos los vencimientos
- 💳 **Pagos** — Registro de cobros con Yape, Plin, transferencia
- 🔔 **Recordatorios** — Reglas automáticas con plantillas de WhatsApp
- 📈 **Estadísticas** — Gráficos de ingresos, crecimiento y distribución
- 📋 **Reportes** — Exportación por plataforma, cliente y período
- 🎮 **Plataformas** — Gestión de cuentas de Netflix, Spotify, Disney+, etc.
- 💬 **Mensajes** — Envío directo a WhatsApp con plantillas
- ⚙️ **Configuración** — Tema, notificaciones, seguridad

## 🚀 Deploy en Vercel

### Opción 1: Desde GitHub (recomendado)

1. Sube este proyecto a GitHub:
```bash
git init
git add .
git commit -m "Initial commit - ItachiPeru"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/itachiperu.git
git push -u origin main
```

2. Ve a [vercel.com](https://vercel.com) → New Project
3. Importa tu repositorio de GitHub
4. Vercel detecta Vite automáticamente → **Deploy**
5. ¡Listo! Tu app estará en `https://itachiperu.vercel.app`

### Opción 2: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

## 💻 Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## 🏗️ Build

```bash
npm run build
npm run preview
```

## 📦 Tecnologías

- **React 18** + Vite
- **Recharts** — Gráficos
- **Lucide React** — Íconos
- **CSS Variables** — Tema oscuro personalizado
- **Google Fonts** — Orbitron, Rajdhani, Noto Sans JP

## 📱 Plataformas soportadas

Netflix, Disney+, Prime Video, Crunchyroll, Max, Spotify, YouTube Premium, ChatGPT Plus, Canva Pro, CapCut Pro, Adobe CC, Paramount+, Deezer, Duolingo Plus, Tidal, Office 365, y más.

---

**ItachiPeru** — うちはイタチ
