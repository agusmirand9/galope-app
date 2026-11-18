import { z } from "zod"

// Mismo esquema que en el back (schemas/alerts.js). Si cambia uno, cambia el otro.
export const TIPOS_AVISO = ["corte", "accidente", "obra", "mal_estado", "libre"]

export const alertsSchema = z.object({
    tipo: z.enum(TIPOS_AVISO, "Elegí un tipo de aviso"),
    descripcion: z.string("La descripción debe ser texto")
        .trim()
        .max(140, "La descripción admite hasta 140 caracteres")
        .optional(),
    lat: z.number("La latitud es obligatoria").min(-90, "Latitud inválida").max(90, "Latitud inválida"),
    lng: z.number("La longitud es obligatoria").min(-180, "Longitud inválida").max(180, "Longitud inválida")
}, "No es un objeto válido")

export const alertsPatchSchema = z.object({
    descripcion: z.string("La descripción es obligatoria")
        .trim()
        .max(140, "La descripción admite hasta 140 caracteres")
}, "No es un objeto válido")
