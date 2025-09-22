# OdontoFlash 🦷

Una plataforma innovadora que conecta estudiantes de odontología con pacientes que necesitan atención dental, facilitando la práctica clínica y proporcionando servicios odontológicos accesibles.

## ✨ Características Principales

### Para Estudiantes
- **Registro gratuito** con perfil profesional detallado
- **Búsqueda de pacientes** según especialización y necesidades
- **Sistema de citas** con gestión completa de horarios
- **Certificación** de prácticas clínicas realizadas
- **Calificaciones** de pacientes para mejorar continuamente

### Para Pacientes
- **Registro simple** especificando necesidades odontológicas
- **Selección de estudiantes** según especialización requerida
- **Precios accesibles** con sistema de descuentos y gratuidad
- **Calificaciones** para garantizar calidad del servicio
- **Comunicación directa** con estudiantes

### Sistema de Calificaciones
- **Calificación bidireccional** entre estudiantes y pacientes
- **Sistema de reseñas** con comentarios detallados
- **Promedio de calificaciones** visible en perfiles
- **Historial de interacciones** para transparencia

## 🚀 Tecnologías Utilizadas

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Base de Datos**: PostgreSQL
- **Autenticación**: NextAuth.js, JWT
- **Deploy**: Netlify

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- PostgreSQL
- Cuenta de Netlify

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/odontoflash.git
   cd odontoflash
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Editar `.env.local` con tus configuraciones:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/odontoflash"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="tu-secreto-aqui"
   ```

4. **Configurar base de datos**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

6. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🚀 Deploy Automático

El proyecto está configurado para deploy automático en Netlify:

1. **Deploy manual**
   ```bash
   npm run deploy
   ```

2. **Deploy automático**
   - El sistema detecta cuando has terminado de generar archivos
   - Crea un sitio en Netlify automáticamente
   - Despliega todos los archivos generados
   - Obtiene la URL del proyecto desplegado
   - Actualiza la base de datos con la URL

## 📱 Funcionalidades

### Dashboard Principal
- Estadísticas en tiempo real
- Gestión de citas
- Lista de pacientes/estudiantes
- Sistema de reseñas

### Sistema de Citas
- Programación flexible
- Estados de cita (Programada, Confirmada, En Progreso, Completada)
- Precios con descuentos
- Opción de gratuidad

### Perfiles de Usuario
- **Estudiantes**: Universidad, semestre, especialización
- **Pacientes**: Necesidades odontológicas, historial médico

### Sistema de Calificaciones
- Calificación de 1 a 5 estrellas
- Comentarios opcionales
- Historial de calificaciones
- Promedio automático

## 🎨 Diseño

- **Tema oscuro** elegante y moderno
- **Responsive design** para todos los dispositivos
- **Animaciones fluidas** con Framer Motion
- **Componentes reutilizables** con Radix UI
- **Optimización SEO** y Core Web Vitals

## 📊 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión

### Usuarios
- `GET /api/patients` - Lista de pacientes
- `GET /api/students` - Lista de estudiantes

### Citas
- `GET /api/appointments` - Lista de citas
- `POST /api/appointments` - Crear cita

### Reseñas
- `GET /api/reviews` - Lista de reseñas
- `POST /api/reviews` - Crear reseña

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construcción
npm run start        # Producción
npm run lint         # Linting
npm run deploy       # Deploy a Netlify
```

## 📈 Optimizaciones

- **SEO**: Sitemap, robots.txt, meta tags
- **Performance**: Lazy loading, code splitting
- **Core Web Vitals**: Optimizado para métricas de Google
- **PWA**: Manifest y service worker
- **Accesibilidad**: ARIA labels, navegación por teclado

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

- **Email**: info@odontoflash.com
- **Teléfono**: +57 (1) 234-5678
- **Dirección**: Bogotá, Colombia

## 🙏 Agradecimientos

- Universidad Nacional de Colombia
- Comunidad de desarrolladores Next.js
- Equipo de Radix UI
- Contribuidores de código abierto

---

**OdontoFlash** - Conectando el futuro de la odontología 🦷✨