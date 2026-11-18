import { z } from "zod"

export const VEHICULOS = ["auto", "camioneta", "utilitario", "moto"]

const paradaSchema = z.object({
    nombre: z.string("El nombre de la parada es obligatorio").min(2, "El nombre debe tener al menos 2 caracteres"),
    nota: z.string("La nota debe ser texto").max(200, "La nota admite hasta 200 caracteres").optional(),
    lat: z.number("La latitud es obligatoria").min(-90, "Latitud inválida").max(90, "Latitud inválida"),
    lng: z.number("La longitud es obligatoria").min(-180, "Longitud inválida").max(180, "Longitud inválida")
}, "La parada no es válida")

const tripBase = z.object({
    origen: z.string("El origen es obligatorio").min(2, "El origen debe tener al menos 2 caracteres"),
    destino: z.string("El destino es obligatorio").min(2, "El destino debe tener al menos 2 caracteres"),
    fechaIda: z.iso.date("La fecha de ida debe tener formato AAAA-MM-DD"),
    fechaVuelta: z.iso.date("La fecha de vuelta debe tener formato AAAA-MM-DD"),
    adultos: z.number("La cantidad de adultos es obligatoria").int("Debe ser un número entero").min(1, "Tiene que viajar al menos un adulto"),
    menores: z.number("La cantidad de menores es obligatoria").int("Debe ser un número entero").min(0, "No puede ser negativo"),
    vehiculo: z.enum(VEHICULOS, "Elegí un tipo de vehículo válido"),
    mascotas: z.boolean("Indicá si viajan mascotas"),
    paradas: z.array(paradaSchema, "Las paradas deben ser una lista")
}, "No es un objeto válido")

const fechasCoherentes = (data) => !data.fechaIda || !data.fechaVuelta || data.fechaVuelta >= data.fechaIda
const fechasError = { error: "La vuelta no puede ser anterior a la ida", path: ["fechaVuelta"] }

// POST y PUT: el viaje completo
export const tripsSchema = tripBase.refine(fechasCoherentes, fechasError)

// PATCH: cualquier subconjunto de campos, pero al menos uno
export const tripsPatchSchema = tripBase.partial()
    .refine(fechasCoherentes, fechasError)
    .refine((data) => Object.keys(data).length > 0, { error: "Enviá al menos un campo para actualizar" })
