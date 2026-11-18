import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { toast } from "react-toastify"
import { useRol } from "../../context/session.context"
import { useApiAvisos } from "../../services/avisos.services"
import { TIPOS_AVISO } from "../../schemas/alerts"
import { TIPOS } from "../../utils/alerts"
import ItemAviso from "../../components/ItemAviso"
import Loading from "../../components/Loading"
import ErrorState from "../../components/ErrorState"
import EmptyState from "../../components/EmptyState"

export default function Avisos() {
    const rol = useRol()
    const { getAvisos, createConfirmacion, updateAviso, deleteAviso } = useApiAvisos()
    const [tipo, setTipo] = useState("")
    const [avisos, setAvisos] = useState([])
    const [estado, setEstado] = useState("LOADING")

    useEffect(() => {
        let activo = true
        getAvisos(tipo)
            .then(data => {
                if (!activo) return
                setAvisos(data)
                setEstado("READY")
            })
            .catch(() => { if (activo) setEstado("ERROR") })
        return () => { activo = false }
    }, [tipo, getAvisos])

    const cambiarTipo = (nuevo) => {
        setTipo(nuevo)
        setEstado("LOADING")
    }

    // La API devuelve el aviso ya actualizado: lo reemplazamos en la lista
    const reemplazar = (actualizado) => setAvisos(prev => prev.map(a => a._id === actualizado._id ? actualizado : a))

    const handleConfirmar = async (id) => {
        try {
            reemplazar(await createConfirmacion(id))
            toast.success("Gracias por confirmar")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleEditar = async (id, descripcion) => {
        try {
            reemplazar(await updateAviso(id, { descripcion }))
            toast.success("Descripción actualizada")
            return true
        } catch (error) {
            toast.error(error.message)
            return false
        }
    }

    const handleBorrar = async (id) => {
        try {
            await deleteAviso(id)
            setAvisos(prev => prev.filter(a => a._id !== id))
            toast.success("Aviso borrado")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="font-display text-xl leading-snug">Avisos de ruta</h1>
                <Link to="/nuevo-aviso" className="btn btn-primary btn-small"><Plus size={18} aria-hidden="true" />Publicar aviso</Link>
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
                <button type="button" aria-pressed={tipo === ""} onClick={() => cambiarTipo("")} className={`btn btn-small ${tipo === "" ? "btn-primary" : "btn-secondary"}`}>Todos</button>
                {TIPOS_AVISO.map(t => (
                    <button key={t} type="button" aria-pressed={tipo === t} onClick={() => cambiarTipo(t)} className={`btn btn-small ${tipo === t ? "btn-primary" : "btn-secondary"}`}>
                        {TIPOS[t].label}
                    </button>
                ))}
            </div>

            {estado === "LOADING" && <Loading />}
            {estado === "ERROR" && <ErrorState />}
            {estado === "READY" && avisos.length === 0 && (
                <EmptyState titulo="No hay avisos vigentes" texto="Si ves algo en la ruta, publicalo para ayudar a quien viene detrás." to="/nuevo-aviso" accion="Publicar un aviso" />
            )}
            {estado === "READY" && avisos.map(aviso => (
                <ItemAviso
                    key={aviso._id}
                    aviso={aviso}
                    esAdmin={rol === "admin"}
                    onConfirmar={handleConfirmar}
                    onEditar={handleEditar}
                    onBorrar={handleBorrar}
                />
            ))}
        </div>
    )
}
