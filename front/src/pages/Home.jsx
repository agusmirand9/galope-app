import { Route, Siren } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useUsuario } from "../context/session.context"
import { useApiViajes } from "../services/viajes.services"
import { diasParaSalir, formatDia } from "../utils/dates"
import Landing from "./Landing"

export default function Home() {
    const usuario = useUsuario()
    const { getViajes } = useApiViajes()
    const [proximo, setProximo] = useState(null)

    useEffect(() => {
        if (!usuario) return
        let activo = true
        getViajes("proximos")
            .then(viajes => { if (activo) setProximo(viajes[0] ?? null) })
            .catch(() => { })
        return () => { activo = false }
    }, [usuario, getViajes])

    // Sin sesión: la landing (el Layout le saca el menú y el ancho máximo en esta ruta)
    if (!usuario) return <Landing />

    return (
        <div className="space-y-4">
            <h1 className="font-display text-xl leading-snug">Hola, {usuario.name.split(" ")[0]}</h1>

            {proximo ? (
                <Link to={`/viajes/${proximo._id}`} className="block rounded-3xl bg-marron p-6 text-white">
                    <p className="text-sm font-semibold text-crema">Tu próximo viaje</p>
                    <p className="mt-1 font-display text-lg leading-snug">{diasParaSalir(proximo.fechaIda, proximo.fechaVuelta)}</p>
                    <p className="mt-3 text-xl font-bold">{proximo.destino}</p>
                    <p className="text-crema">{formatDia(proximo.fechaIda)} al {formatDia(proximo.fechaVuelta)}</p>
                </Link>
            ) : (
                <div className="card">
                    <p className="font-bold">Todavía no tenés viajes próximos</p>
                    <p className="mt-1 text-azul/80">Armá tu primer recorrido y dejalo guardado en Mis viajes.</p>
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
                <Link to="/nuevo-viaje" className="rounded-3xl bg-azul p-6 text-white">
                    <p className="flex items-center gap-2 text-lg font-bold text-celeste"><Route size={22} aria-hidden="true" />Armar un viaje</p>
                    <p className="mt-1">Elegí destino, fechas, quiénes viajan y tus paradas.</p>
                </Link>
                <Link to="/avisos" className="rounded-3xl bg-celeste p-6 text-azul">
                    <p className="flex items-center gap-2 text-lg font-bold"><Siren size={22} aria-hidden="true" />Avisos de ruta</p>
                    <p className="mt-1">Mirá qué dicen otros viajeros o publicá lo que ves.</p>
                </Link>
            </div>
        </div>
    )
}
