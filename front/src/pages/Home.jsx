import { Route, Siren } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useUsuario } from "../context/session.context"
import { useApiViajes } from "../services/viajes.services"
import { useApiAvisos } from "../services/avisos.services"
import { TIPOS } from "../utils/alerts"
import { diasParaSalir, formatDia, hace } from "../utils/dates"
import Landing from "./Landing"

export default function Home() {
    const usuario = useUsuario()
    const { getViajes } = useApiViajes()
    const { getAvisos } = useApiAvisos()
    const [proximo, setProximo] = useState(null)
    const [avisos, setAvisos] = useState([])

    useEffect(() => {
        if (!usuario) return
        let activo = true
        getViajes("proximos")
            .then(viajes => { if (activo) setProximo(viajes[0] ?? null) })
            .catch(() => { })
        return () => { activo = false }
    }, [usuario, getViajes])

    // Los 3 avisos más recientes (si falla, la sección simplemente no se muestra)
    useEffect(() => {
        if (!usuario) return
        let activo = true
        getAvisos()
            .then(data => { if (activo) setAvisos(data.slice(0, 3)) })
            .catch(() => { })
        return () => { activo = false }
    }, [usuario, getAvisos])

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

            <section aria-labelledby="ultimos-avisos" className="space-y-3 pt-2">
                <div className="flex items-center justify-between gap-3">
                    <h2 id="ultimos-avisos" className="text-lg font-bold">Últimos avisos de ruta</h2>
                    <Link to="/avisos" className="inline-flex min-h-11 items-center text-sm font-semibold text-marron underline">Ver todos</Link>
                </div>
                {avisos.length === 0 ? (
                    <div className="card">
                        <p className="font-bold">No hay avisos vigentes</p>
                        <p className="mt-1 text-azul/80">Si ves algo en la ruta, publicalo para ayudar a quien viene detrás.</p>
                        <Link to="/nuevo-aviso" className="btn btn-primary btn-small mt-3">Publicar un aviso</Link>
                    </div>
                ) : avisos.map(aviso => {
                    const tipo = TIPOS[aviso.tipo]
                    const Icono = tipo.icono
                    const n = aviso.totalConfirmaciones
                    return (
                        <Link key={aviso._id} to="/avisos" className={`card block border-l-8 ${tipo.borde}`}>
                            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${tipo.badge}`}>
                                <Icono size={18} aria-hidden="true" />{tipo.label}
                            </span>
                            <p className="mt-2">{aviso.descripcion || "Sin descripción"}</p>
                            <p className="mt-1 text-sm text-azul/80">Confirmado por {n} {n === 1 ? "viajero" : "viajeros"}, {hace(aviso.createdAt)}</p>
                        </Link>
                    )
                })}
            </section>
        </div>
    )
}
