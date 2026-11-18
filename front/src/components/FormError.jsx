import { TriangleAlert } from "lucide-react"

// Errores de formulario: marrón + ícono de advertencia + cartel crema (nunca rojo)
export default function FormError({ message }) {
    if (!message) return null
    return (
        <p role="alert" className="flex items-start gap-2 rounded-xl border-2 border-marron bg-crema px-3 py-2 text-sm font-medium text-marron">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{message}</span>
        </p>
    )
}
