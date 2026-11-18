import { ArrowLeft, Pencil, Trash2 } from "lucide-react"
import { Link, useParams } from "react-router"
import { useViaje } from "../../hooks/useViaje"
import DetalleViaje from "../../components/DetalleViaje"
import Loading from "../../components/Loading"
import ErrorState from "../../components/ErrorState"

export default function Detalle() {
    const { id } = useParams()
    const { viaje, estado } = useViaje(id)

    if (estado === "LOADING") return <Loading />
    if (estado === "ERROR") return <ErrorState message="No encontramos este viaje." />

    return (
        <div className="space-y-4">
            <DetalleViaje viaje={viaje} />
            <div className="flex flex-wrap gap-2">
                <Link to={`/editar-viaje/${viaje._id}`} className="btn btn-primary btn-small"><Pencil size={18} aria-hidden="true" />Editar</Link>
                <Link to={`/eliminar-viaje/${viaje._id}`} className="btn btn-secondary btn-small"><Trash2 size={18} aria-hidden="true" />Eliminar</Link>
                <Link to="/viajes" className="btn btn-secondary btn-small"><ArrowLeft size={18} aria-hidden="true" />Volver</Link>
            </div>
        </div>
    )
}
