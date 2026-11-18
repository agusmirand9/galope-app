import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import { useApiViajes } from "../../services/viajes.services"
import { useViaje } from "../../hooks/useViaje"
import FormViaje from "../../components/FormViaje"
import Loading from "../../components/Loading"
import ErrorState from "../../components/ErrorState"

export default function EditarViaje() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { updateViaje } = useApiViajes()
    const { viaje, estado } = useViaje(id)

    const onSubmit = async (datos) => {
        try {
            const actualizado = await updateViaje(id, datos)
            toast.success("Cambios guardados")
            navigate(`/viajes/${actualizado._id}`)
        } catch (error) {
            toast.error(error.message)
        }
    }

    if (estado === "LOADING") return <Loading />
    if (estado === "ERROR") return <ErrorState message="No encontramos este viaje." />

    // El formulario se monta recién cuando ya tenemos los datos
    return <FormViaje defaultValues={viaje} onSubmit={onSubmit} titulo="Editar viaje" textoBoton="Guardar cambios" />
}
