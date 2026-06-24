# CLIENTMANAGER-BACK-V1

API REST para la gestión de clientes, construida con Node.js, Express 5, TypeScript, Prisma 7 y PostgreSQL. Incluye autenticación con JWT y soft delete.

---

## Stack

- **Runtime:** Node.js 24
- **Framework:** Express 5
- **Lenguaje:** TypeScript 6
- **ORM:** Prisma 7
- **Base de datos:** PostgreSQL 17
- **Autenticación:** JWT + bcrypt
- **Validación:** Zod
- **Package manager:** pnpm

---

## Arquitectura

El proyecto sigue el patrón MVC definido por la empresa:

```
route → controller → model
(service solo si hay varios models o integraciones externas)
```

```
src/
├── config/          # Configuración técnica (DB, env)
├── controllers/     # Punto de entrada HTTP
├── middlewares/     # Auth, validadores, error handler
│   └── validators/
├── models/          # Queries y reglas de negocio
├── routes/          # Definición de endpoints
├── services/        # Lógica entre modelos o externos (AuthService)
└── views/
    └── responses/   # DTOs de respuesta
```

---

## Requisitos

- Node.js 24+
- pnpm 11+
- Docker y Docker Compose (para correr con Docker)
- PostgreSQL 17 (solo si corres en local sin Docker)

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/myapp?schema=public"
JWT_SECRET="tu_secreto_jwt"
```

Para Docker, crea un `.env.docker`:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/myapp?schema=public"
JWT_SECRET="tu_secreto_jwt"
```

---

## Instalación y uso — Desarrollo local

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd CLIENTMANAGER-BACK-V1
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Copia el ejemplo y completa los valores:

```bash
cp .env.example .env
```

### 4. Levantar la base de datos con Docker

```bash
docker run --name postgres-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=myapp \
  -p 5432:5432 \
  -d postgres:17
```

### 5. Correr las migraciones

```bash
pnpm dlx prisma migrate dev
```

### 6. Generar el cliente de Prisma

```bash
pnpm dlx prisma generate
```

### 7. Arrancar el servidor

```bash
pnpm dev
```

El servidor corre en `http://localhost:3000/api`.

---

## Instalación y uso — Docker

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd CLIENTMANAGER-BACK-V1
```

### 2. Configurar variables de entorno para Docker

Crea el archivo `.env.docker` con los valores correspondientes (ver sección de variables de entorno).

### 3. Levantar los contenedores

```bash
docker-compose up --build
```

Esto levanta la base de datos y la aplicación. Las migraciones se aplican automáticamente al iniciar.

### 4. Detener los contenedores

```bash
docker-compose down
```

---

## Endpoints

### Auth

| Método | Endpoint           | Descripción          | Auth requerida |
| ------ | ------------------ | -------------------- | -------------- |
| POST   | /api/auth/register | Registrar un usuario | No             |
| POST   | /api/auth/login    | Iniciar sesión       | No             |

### Clients

| Método | Endpoint         | Descripción                         | Auth requerida |
| ------ | ---------------- | ----------------------------------- | -------------- |
| GET    | /api/clients     | Listar clientes activos             | Sí             |
| GET    | /api/clients/:id | Obtener un cliente por ID           | Sí             |
| POST   | /api/clients     | Crear un cliente                    | Sí             |
| PUT    | /api/clients/:id | Actualizar un cliente               | Sí             |
| DELETE | /api/clients/:id | Desactivar un cliente (soft delete) | Sí             |

### Health

| Método | Endpoint    | Descripción         |
| ------ | ----------- | ------------------- |
| GET    | /api/health | Estado del servidor |

---

## Autenticación

Las rutas protegidas requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

El token se obtiene al hacer login o registro.

---

## Notas

- El `DELETE` de clientes es un **soft delete** — el registro no se elimina de la base de datos, solo se desactiva (`status: false`).
- Los clientes desactivados no aparecen en los listados ni en las búsquedas por ID.
