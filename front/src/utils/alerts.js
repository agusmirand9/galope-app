import { CarFront, CircleCheck, Construction, OctagonX, Waypoints } from "lucide-react"

// Los colores de estado son SOLO para avisos (identidad GALOPÉ).
// Las clases van completas para que Tailwind las detecte.
export const TIPOS = {
    corte:      { label: "Ruta cortada",        icono: OctagonX,     badge: "bg-estado-rojo text-white",       borde: "border-l-estado-rojo" },
    accidente:  { label: "Accidente",           icono: CarFront,     badge: "bg-estado-rojo text-white",       borde: "border-l-estado-rojo" },
    obra:       { label: "Obra o demora",       icono: Construction, badge: "bg-estado-amarillo text-marron",  borde: "border-l-estado-amarillo" },
    mal_estado: { label: "Tramo en mal estado", icono: Waypoints,    badge: "bg-estado-amarillo text-marron",  borde: "border-l-estado-amarillo" },
    libre:      { label: "Ruta libre",          icono: CircleCheck,  badge: "bg-estado-verde text-azul",       borde: "border-l-estado-verde" }
}
