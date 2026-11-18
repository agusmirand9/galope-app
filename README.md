# GALOPÉ

Aplicación para planificar y acompañar viajes en auto por las rutas argentinas. Ayuda a armar el recorrido, guardar los viajes y compartir **avisos de ruta** (cortes, obras, tramos en mal estado) que la comunidad de viajeros confirma, para que quien viene detrás sepa qué se va a encontrar.

> La libertad de salir a la ruta, con la tranquilidad de ir bien acompañado.

Proyecto del **Parcial 2 de Aplicaciones Híbridas** (Tecnicatura Superior en Diseño y Programación Web, Da Vinci). Stack MERN.

## Qué hace esta versión

- **Cuenta:** registro e inicio de sesión con contraseña encriptada (bcrypt) y autenticación con JWT.
- **Mis viajes:** crear, ver, editar y eliminar viajes, con paradas propias. Pestañas Próximos y Pasados.
- **Avisos de ruta:** publicar con la ubicación actual, filtrar por tipo, confirmar (una vez por persona), editar la descripción y borrar. Vencen a las 24 h y cada confirmación renueva el plazo.
- **Roles:** `user` y `admin` (el admin puede borrar cualquier aviso y ver el historial en `/historial`).

Quedan para próximas etapas: mapas, clima, puntos de interés, Modo viaje y navegación.

## Estructura

```
galope/
├── back/    API REST (Node, Express, MongoDB, Zod, JWT)
└── front/   Aplicación web (React, Vite, Tailwind, React Router)
```

Cada carpeta tiene su propio `README` con el detalle (endpoints, modelo de datos, rutas, estructura interna). En `back/` también hay una colección de Postman (`galope.postman_collection.json`) para probar la API.

## Cómo levantar el proyecto

Requisitos: Node 20 o superior, y una base de datos en MongoDB Atlas (el plan gratuito alcanza).

**1. Backend**

```bash
cd back
pnpm install            # o npm install
cp .env.example .env    # y completá los valores
pnpm dev
```

Variables de `back/.env` (el archivo se entrega aparte):

| Variable | Qué es |
|---|---|
| `PORT` | Puerto de la API (2026) |
| `MONGO_URI` | Cadena de conexión de MongoDB Atlas |
| `DB_NAME` | Nombre de la base (`galope`) |
| `JWT_SECRET` | Frase secreta para firmar los tokens |

Si todo salió bien, la consola muestra `Funcionando... http://localhost:2026`.

**2. Frontend** (en otra terminal)

```bash
cd front
pnpm install            # o npm install
pnpm dev
```

Abrí la dirección que muestra Vite (normalmente `http://localhost:5173`). La URL de la API está en `front/.env.development` (`VITE_API_URL=http://localhost:2026/api`).

## Probar la app

1. Entrá a **Sumate** y creá una cuenta (contraseña de 8 o más caracteres).
2. Iniciá sesión. Vas a llegar a **Mis viajes**.
3. Armá un viaje con **Nuevo viaje**.
4. En **Avisos**, publicá uno. Para confirmar avisos necesitás una segunda cuenta, porque no se puede confirmar el propio.

**Usuario admin:** registrá un usuario, cambiá su campo `rol` a `"admin"` en Atlas y volvé a iniciar sesión. Aparece el link **Historial** en el menú.

## Cómo cumple la pauta

| Requisito | Dónde está |
|---|---|
| Backend como API REST separado | `back/` |
| Autenticación JWT | `back/services/token.service.js` y `back/middlewares/auth.validate.js` |
| Base NoSQL y modelado | MongoDB, con el driver nativo (`back/config/db.js`). El modelo de datos está explicado en `back/readme.md` |
| Usuarios, login y registro con contraseña encriptada | `back/services/users.service.js` (bcrypt) |
| Dos entidades más, con CRUD | **Viajes** y **Avisos** |
| División en routers, controllers, services, middlewares y esquemas | `back/api/routes`, `back/api/controllers`, `back/services`, `back/middlewares`, `back/schemas` |
| URIs que identifican recursos | `/api/viajes`, `/api/avisos`, `/api/avisos/:id/confirmaciones` |
| Validación en backend y frontend | Esquemas Zod en `back/schemas` y `front/src/schemas` (mismas reglas) |
| Componentes funcionales y hooks | `front/src/components` y `front/src/pages` |
| Context | `front/src/context/session.context.jsx` |
| Router y rutas protegidas (por sesión y por rol) | `front/src/main.jsx` y `front/src/components/ProtectedRoute.jsx` (`/historial` solo admin) |
| Hooks propios | `front/src/hooks/useViaje.js` |
| Vistas separadas de la lógica de la API | `front/src/services` (los componentes no usan `fetch`) |
| Consumo de la API | `front/src/services/api.services.js` |
