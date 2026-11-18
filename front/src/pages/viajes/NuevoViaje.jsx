import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { useApiViajes } from "../../services/viajes.services"
import FormViaje from "../../components/FormViaje"

const VIAJE_VACIO = {
    origen: "",
    destino: "",
    fechaIda: "",
    fechaVuelta: "",
    adultos: 1,
    menores: 0,
    vehiculo: "auto",
    mascotas: false,
    paradas: []
}

export default function NuevoViaje() {
    const navigate = useNavigate()
    const { createViaje } = useApiViajes()

    const onSubmit = async (viaje) => {
        try {
            const creado = await createViaje(viaje)
            toast.success("Viaje guardado en Mis viajes")
            navigate(`/viajes/${creado._id}`)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return <FormViaje defaultValues={VIAJE_VACIO} onSubmit={onSubmit} titulo="Nuevo viaje" textoBoton="Guardar viaje" />
}
