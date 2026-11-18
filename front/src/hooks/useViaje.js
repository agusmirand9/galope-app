import { useEffect, useState } from "react"
import { useApiViajes } from "../services/viajes.services"

// Hook propio: carga UN viaje y expone su estado ("LOADING" | "READY" | "ERROR").
// Lo usan Detalle, EditarViaje y EliminarViaje, que antes repetían este mismo useEffect.
export function useViaje(id) {
    const { getViajesById } = useApiViajes()
    const [viaje, setViaje] = useState(null)
    const [estado, setEstado] = useState("LOADING")

    useEffect(() => {
        let activo = true   // evita actualizar el estado si el componente ya se desmontó
        getViajesById(id)
            .then(data => {
                if (!activo) return
                setViaje(data)
                setEstado("READY")
            })
            .catch(() => { if (activo) setEstado("ERROR") })
        return () => { activo = false }
    }, [id, getViajesById])

    return { viaje, estado }
}
