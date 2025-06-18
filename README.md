# 🧠 Backend - School System API

Este es el backend de la app de gestión escolar, desarrollado en **Node.js + Express + MongoDB**. Maneja autenticación, CRUDs, validaciones y relaciones entre entidades.

## ⚙️ Tecnologías

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (Autenticación)
- CORS
- Dotenv

## 🚀 Instalación

```bash
git clone https://github.com/tuusuario/school-system.git backend-school-system
cd backend-school-system
npm install
```

Crea un archivo `.env`:

```env
PORT=4000
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/school
JWT_SECRET=supersecretkey
```

Inicia el servidor:

```bash
npm run dev
```

## 🔐 Rutas protegidas con JWT

Autenticación:
```http
POST /api/auth/login
Body: { "username": "admin", "password": "123456" }
```

Rutas principales:
```
GET/POST/PUT/DELETE:
  /api/alumnos
  /api/materias
  /api/inscripciones
  /api/calificaciones
```

## 📌 Validaciones clave

- ❌ No se permite inscribir dos veces a un alumno en la misma materia
- ❌ No se puede calificar a un alumno si no está inscrito
- 🧹 Al eliminar alumno o materia, se eliminan inscripciones y calificaciones relacionadas
- ✅ Al eliminar una inscripción, se elimina su calificación también

## 📁 Estructura

```
src/
├── controllers/      # Lógica de rutas
├── models/           # Esquemas de Mongoose
├── routes/           # Endpoints organizados
├── middlewares/      # Auth con JWT
└── index.js          # Arranque del servidor
```

## ✨ Autores

Desarrollado por:
- **Ángel García**
- **Daniel Moreno**
- **José Muñetón**