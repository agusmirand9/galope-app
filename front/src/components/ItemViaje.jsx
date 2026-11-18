import { Eye, Pencil, Trash2 } from "lucide-react"
import { Link } from "react-router"
import { formatDia } from "../utils/dates"

export default function ItemViaje({ viaje }) {
    const viajeros = viaje.adultos + viaje.menores
    return (
        <article className="card">
            <h2 className="text-xl font-bold">{viaje.destino}</h2>
            <p className="text-azul/80">Desde {viaje.origen}</p>
            <p className="mt-2 font-medium">{formatDia(viaje.fechaIda)} al {formatDia(viaje.fechaVuelta)}</p>
            <p className="text-sm text-azul/80">
                {viajeros} {viajeros === 1 ? "viajero" : "viajeros"}, {viaje.vehiculo}
                {viaje.paradas.length > 0 && `, ${viaje.paradas.length} ${viaje.paradas.length === 1 ? "parada" : "paradas"}`}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
                <Link to={`/viajes/${viaje._id}`} className="btn btn-primary btn-small"><Eye size={18} aria-hidden="true" />Ver</Link>
                <Link to={`/editar-viaje/${viaje._id}`} className="btn btn-secondary btn-small"><Pencil size={18} aria-hidden="true" />Editar</Link>
                <Link to={`/eliminar-viaje/${viaje._id}`} className="btn btn-secondary btn-small"><Trash2 size={18} aria-hidden="true" />Eliminar</Link>
            </div>
        </article>
    )
}
