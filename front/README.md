# GALOPÉ · Frontend

Planificá tu viaje en auto por las rutas argentinas y viajá informado con avisos confirmados por otros viajeros.
Este es el frontend (React + Vite). Consume la API REST del backend de GALOPÉ.

## Cómo levantarlo

1. Tené el backend corriendo (por defecto en `http://localhost:2026`).
2. Instalá dependencias: `pnpm install` (o `npm install`).
3. Revisá `.env.development`: `VITE_API_URL=http://localhost:2026/api`.
4. `pnpm dev` y abrí la dirección que muestra Vite (normalmente `http://localhost:5173`).

Otros comandos: `pnpm build` (genera `dist/`), `pnpm preview`, `pnpm lint`.

Para producción, editá `.env.production` con la URL pública de tu API.

## Rutas

| Ruta | Acceso | Qué muestra |
|---|---|---|
| `/` | público | Inicio (con sesión: próximo viaje) |
| `/login`, `/register` | público | Iniciar sesión y crear cuenta |
| `/salir` | público | Cierra la sesión |
| `/viajes` | con sesión | Mis viajes (Próximos / Pasados) |
| `/viajes/:id` | con sesión | Detalle del viaje |
| `/nuevo-viaje` | con sesión | Crear viaje |
| `/editar-viaje/:id` | con sesión | Editar viaje |
| `/eliminar-viaje/:id` | con sesión | Confirmar eliminación |
| `/avisos` | con sesión | Avisos vigentes, con filtro por tipo |
| `/nuevo-aviso` | con sesión | Publicar un aviso con la ubicación actual |
| `/historial` | solo admin | Historial de avisos, incluso vencidos y borrados |

## Estructura

```
src/
├── main.jsx              Router (createBrowserRouter) y SessionProvider
├── context/              session.context.jsx (usuario, token y rol)
├── hooks/                Hooks propios (useViaje: carga un viaje y su estado)
├── services/             api.services.js (único fetch) + un archivo por entidad
├── schemas/              Esquemas Zod (copia de los del backend)
├── components/           Piezas reutilizables (Layout, Nav, formularios, tarjetas)
├── pages/                auth/, viajes/, avisos/ y páginas sueltas
└── utils/                Fechas, tipos de aviso y geolocalización
```

## Reglas del proyecto

- Los componentes **no llaman a `fetch`**: usan los hooks de `services/` (`useApiViajes`, `useApiAvisos`, `useApiUsuarios`).
- La sesión vive en Context y se guarda en `localStorage` (clave `usuario`). El rol se lee del token.
- Los esquemas de `src/schemas` deben coincidir con los del backend.
- Los colores rojo, amarillo y verde se usan solo para los avisos. Los errores de formulario van en marrón.
- Íconos: se usa [Lucide](https://lucide.dev/icons/) (`lucide-react`). Se importan por nombre, por ejemplo `import { Plus } from "lucide-react"`, y los decorativos llevan `aria-hidden="true"`.
- Menú: en celular (menos de 640 px) la barra se reemplaza por un botón de hamburguesa que despliega los links. Está en `components/Nav.jsx`.

## Criterios de consistencia

Una misma situación se resuelve siempre de la misma forma:

- **Carga de datos:** cada página usa un estado `"LOADING" | "READY" | "ERROR"` y muestra `Loading`, `ErrorState` o `EmptyState`. Lo que se repite en varias páginas va en un hook propio (`useViaje`).
- **Errores del servidor:** en los formularios de cuenta (login y registro) van **en línea**, con `FormError`, porque hablan de los campos ("email repetido", "credenciales incorrectas"). En el resto de las acciones (guardar, editar, eliminar, confirmar) van en un **toast**.
- **Confirmar un borrado:** los viajes tienen su propia página (`/eliminar-viaje/:id`) con los datos a la vista. Los avisos no tienen página propia, así que se confirman **en la misma tarjeta** ("¿Borrar este aviso?").
- **Editar:** el viaje se reemplaza completo con `PUT` desde un formulario. El aviso solo permite cambiar la descripción, así que se edita en la tarjeta con `PATCH`.
- **Rutas por rol:** `ProtectedRoute` acepta una lista de roles. Por defecto deja pasar a `user` y `admin`; `/historial` solo a `admin`.
- **Llamadas a la API:** solo desde `services/`, a través de `call()`. Los componentes no usan `fetch`.
