# GALOPÉ · Backend (API REST)

API REST de GALOPÉ: cuentas, viajes y avisos de ruta confirmados por la comunidad.
Node + Express 5 + MongoDB (driver nativo) + Zod + JWT.

## Cómo levantarlo

1. `pnpm install` (o `npm install`).
2. Copiá `.env.example` como `.env` y completá los valores:

| Variable | Qué es |
|---|---|
| `PORT` | Puerto de la API (2026 por defecto) |
| `MONGO_URI` | Cadena de conexión de tu cluster de MongoDB Atlas |
| `DB_NAME` | Nombre de la base (ej. `galope`) |
| `JWT_SECRET` | Frase larga y secreta para firmar los tokens |

3. `pnpm dev` (con recarga automática) o `pnpm start`.

El archivo `.env` no se sube a git: se entrega aparte.

## Arquitectura

`Router → Middlewares → Controller → Service → MongoDB`

```
main.js               arranque, 404 en JSON y middleware de errores
config/db.js          conexión única a MongoDB + índice único de email
api/routes/           URL + verbo + middlewares
api/controllers/      traducen el resultado del service a HTTP
services/             lógica de negocio y acceso a la base
middlewares/          validación (Zod), token, roles, id
schemas/              esquemas Zod
```

## Autenticación

`POST /api/usuarios/login` devuelve un `token` (vale 2 horas). Se envía en cada pedido protegido:

```
authorization: <token>
```

Roles: `user` (por defecto) y `admin`. Para crear un admin, cambiá a mano el campo `rol` de un usuario en Atlas y volvé a iniciar sesión.

## Endpoints

| Verbo | URL | Acceso | Descripción |
|---|---|---|---|
| POST | `/api/usuarios` | público | Registrarse |
| POST | `/api/usuarios/login` | público | Iniciar sesión |
| GET | `/api/usuarios/me` | token | Datos del token |
| GET | `/api/viajes?estado=proximos\|pasados` | token | Mis viajes |
| GET | `/api/viajes/:id` | token | Un viaje mío |
| POST | `/api/viajes` | token | Crear viaje |
| PUT | `/api/viajes/:id` | token | Reemplazar viaje completo |
| PATCH | `/api/viajes/:id` | token | Actualizar campos sueltos |
| DELETE | `/api/viajes/:id` | token | Eliminar (borrado lógico) |
| GET | `/api/avisos?tipo=` | token | Avisos vigentes |
| GET | `/api/avisos/historial` | admin | Todos, incluso vencidos y borrados |
| GET | `/api/avisos/:id` | token | Un aviso vigente |
| POST | `/api/avisos` | token | Publicar (máx. 5 por hora) |
| PATCH | `/api/avisos/:id` | token | Editar la descripción (solo el autor) |
| DELETE | `/api/avisos/:id` | autor o admin | Borrar (borrado lógico) |
| POST | `/api/avisos/:id/confirmaciones` | token | Confirmar un aviso (una vez por persona) |

## Reglas de negocio

- Cada persona ve y modifica solo **sus** viajes. Los ajenos responden `404`.
- Tipos de aviso: `corte`, `accidente`, `obra`, `mal_estado`, `libre`.
- Un aviso vence a las 24 h; cada confirmación renueva el plazo.
- No se puede confirmar el propio aviso ni confirmar dos veces.
- El tipo y la ubicación de un aviso no se editan.

## Códigos de estado

`200` OK · `201` creado · `400` datos inválidos o JSON mal formado · `401` sin token, token inválido o credenciales incorrectas · `403` sin permiso · `404` no existe (recurso o ruta) · `409` conflicto (email repetido, ya confirmado) · `429` límite de avisos por hora · `500` error interno (se registra en la consola del servidor).

Las respuestas de error siempre son JSON con la forma `{ "message": "..." }`. Los errores de validación son una lista de textos `"campo:mensaje"`.

## Modelo de datos

Tres colecciones en MongoDB.

**`usuarios`**

| Campo | Tipo | Notas |
|---|---|---|
| `_id` | ObjectId | |
| `name` | string | |
| `email` | string | en minúsculas, con índice único |
| `password` | string | hash bcrypt, nunca se devuelve en las respuestas |
| `rol` | `"user"` \| `"admin"` | siempre `user` al registrarse |
| `createdAt` | Date | |

**`viajes`**

| Campo | Tipo | Notas |
|---|---|---|
| `_id` | ObjectId | |
| `usuarioId` | ObjectId | referencia al dueño del viaje |
| `origen`, `destino` | string | |
| `fechaIda`, `fechaVuelta` | string `AAAA-MM-DD` | son días, sin hora |
| `adultos`, `menores` | number | |
| `vehiculo` | `auto` \| `camioneta` \| `utilitario` \| `moto` | |
| `mascotas` | boolean | |
| `paradas` | array **embebida** | cada una: `nombre`, `nota?`, `lat`, `lng` |
| `eliminado` | boolean | borrado lógico |
| `createdAt`, `updatedAt` | Date | |

**`avisos`**

| Campo | Tipo | Notas |
|---|---|---|
| `_id` | ObjectId | |
| `usuarioId` | ObjectId | referencia al autor |
| `tipo` | `corte` \| `accidente` \| `obra` \| `mal_estado` \| `libre` | |
| `descripcion` | string (hasta 140) | opcional |
| `lat`, `lng` | number | ubicación de publicación |
| `confirmaciones` | array de ObjectId | una por persona |
| `venceEn` | Date | +24 h, cada confirmación lo renueva |
| `eliminado` | boolean | borrado lógico |
| `createdAt`, `updatedAt` | Date | |

**Por qué así**

- **Paradas embebidas:** solo existen dentro de un viaje, siempre se leen junto con él y nadie las consulta por separado. Es el mismo criterio que las `reviews` embebidas del ejemplo de la cátedra.
- **`usuarioId` como referencia:** hace falta el id para verificar "este viaje es tuyo" y "solo el autor edita el aviso". La pantalla no muestra el nombre del autor, así que embeber sus datos no aportaría nada. Las respuestas nunca exponen ids de personas (ver `toPublic` en `alerts.service.js`).
- **`confirmaciones` como array de ids:** permite garantizar una confirmación por persona con una escritura atómica (`confirmaciones: { $ne: yo }` junto con `$push`).
- **Borrado lógico:** nada se elimina de la base; se marca `eliminado: true` y las consultas lo filtran.
- **Fechas:** los viajes guardan el día como texto (`AAAA-MM-DD`) para evitar corrimientos de zona horaria; los avisos usan `Date` porque importa la hora.

## Probar con Postman

Importá `galope.postman_collection.json`. La colección usa las variables `baseUrl` (por defecto `http://localhost:2026/api`) y `token`; la request **Login** guarda el token sola, y el resto lo envía en el header `authorization`.
