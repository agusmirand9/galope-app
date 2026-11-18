import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useApiViajes } from "../../services/viajes.services"
import ItemViaje from "../../components/ItemViaje"
import Loading from "../../components/Loading"
import ErrorState from "../../components/ErrorState"
import EmptyState from "../../components/EmptyState"

const TABS = [
    { id: "proximos", label: "Próximos" },
    { id: "pasados", label: "Pasados" }
]

export default function Viajes() {
    const { getViajes } = useApiViajes()
    const [tab, setTab] = useState("proximos")
    const [viajes, setViajes] = useState([])
    const [estado, setEstado] = useState("LOADING")

    useEffect(() => {
        let activo = true
        getViajes(tab)
            .then(data => {
                if (!activo) return
                setViajes(data)
                setEstado("READY")
            })
            .catch(() => { if (activo) setEstado("ERROR") })
        return () => { activo = false }
    }, [tab, getViajes])

    const cambiarTab = (id) => {
        setTab(id)
        setEstado("LOADING")
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="font-display text-xl leading-snug">Mis viajes</h1>
                <Link to="/nuevo-viaje" className="btn btn-primary btn-small"><Plus size={18} aria-hidden="true" />Nuevo viaje</Link>
            </div>

            <div className="flex gap-2" role="group" aria-label="Filtrar viajes">
                {TABS.map(t => (
                    <button
                        key={t.id}
                        type="button"
                        aria-pressed={tab === t.id}
                        onClick={() => cambiarTab(t.id)}
                        className={`btn btn-small ${tab === t.id ? "btn-primary" : "btn-secondary"}`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {estado === "LOADING" && <Loading />}
            {estado === "ERROR" && <ErrorState />}
            {estado === "READY" && viajes.length === 0 && (
                tab === "proximos"
                    ? <EmptyState titulo="No tenés viajes próximos" texto="Armá un recorrido y va a aparecer acá." to="/nuevo-viaje" accion="Armar un viaje" />
                    : <EmptyState titulo="Todavía no hay viajes pasados" texto="Cuando termine tu primer viaje, lo vas a ver en esta pestaña." />
            )}
            {estado === "READY" && viajes.map(viaje => <ItemViaje key={viaje._id} viaje={viaje} />)}
        </div>
    )
}
