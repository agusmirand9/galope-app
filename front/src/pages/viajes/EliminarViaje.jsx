import { Trash2 } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import { useApiViajes } from "../../services/viajes.services"
import { useViaje } from "../../hooks/useViaje"
import DetalleViaje from "../../components/DetalleViaje"
import Loading from "../../components/Loading"
import ErrorState from "../../components/ErrorState"

export default function EliminarViaje() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { deleteViaje } = useApiViajes()
    const { viaje, estado } = useViaje(id)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await deleteViaje(id)
            toast.success("Viaje eliminado")
            navigate("/viajes")
        } catch (error) {
            toast.error(error.message)
        }
    }

    if (estado === "LOADING") return <Loading />
    if (estado === "ERROR") return <ErrorState message="No encontramos este viaje." />

    return (
        <div className="space-y-4">
            <p className="rounded-2xl border-2 border-marron bg-crema p-4 font-medium text-marron">
                Vas a eliminar este viaje. Revisá los datos antes de confirmar.
            </p>
            <DetalleViaje viaje={viaje} />
            <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
                <button type="submit" className="btn btn-primary btn-small"><Trash2 size={18} aria-hidden="true" />Eliminar viaje</button>
                <Link to="/viajes" className="btn btn-secondary btn-small">Cancelar</Link>
            </form>
        </div>
    )
}
