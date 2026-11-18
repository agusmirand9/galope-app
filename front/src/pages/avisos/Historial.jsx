import { useEffect, useState } from "react"
import { useApiAvisos } from "../../services/avisos.services"
import { TIPOS } from "../../utils/alerts"
import Loading from "../../components/Loading"
import ErrorState from "../../components/ErrorState"
import EmptyState from "../../components/EmptyState"

// Estado del aviso según los datos que devuelve la API
function estadoDeAviso(aviso) {
    if (aviso.eliminado) return "Borrado"
    if (new Date(aviso.venceEn) < new Date()) return "Vencido"
    return "Vigente"
}

// Página solo para admin (la protege ProtectedRoute con rol=["admin"] y el back con validateRoles)
export default function Historial() {
    const { getHistorial } = useApiAvisos()
    const [avisos, setAvisos] = useState([])
    const [estado, setEstado] = useState("LOADING")

    useEffect(() => {
        let activo = true
        getHistorial()
            .then(data => {
                if (!activo) return
                setAvisos(data)
                setEstado("READY")
            })
            .catch(() => { if (activo) setEstado("ERROR") })
        return () => { activo = false }
    }, [getHistorial])

    return (
        <div className="space-y-4">
            <div>
                <h1 className="font-display text-xl leading-snug">Historial de avisos</h1>
                <p className="mt-1 text-azul/80">Los últimos 100 avisos, incluso vencidos y borrados.</p>
            </div>

            {estado === "LOADING" && <Loading />}
            {estado === "ERROR" && <ErrorState />}
            {estado === "READY" && avisos.length === 0 && (
                <EmptyState titulo="Todavía no hay avisos" texto="Cuando alguien publique uno, va a aparecer acá." />
            )}
            {estado === "READY" && avisos.map(aviso => {
                const tipo = TIPOS[aviso.tipo]
                const Icono = tipo.icono
                const situacion = estadoDeAviso(aviso)
                const n = aviso.totalConfirmaciones
                return (
                    <article key={aviso._id} className={`card border-l-8 ${tipo.borde}`}>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${tipo.badge}`}>
                                <Icono size={18} aria-hidden="true" />{tipo.label}
                            </span>
                            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${situacion === "Vigente" ? "bg-celeste text-azul" : "border-2 border-marron bg-crema text-marron"}`}>
                                {situacion}
                            </span>
                        </div>
                        <p className="mt-3 text-lg">{aviso.descripcion || <span className="text-azul/60">Sin descripción</span>}</p>
                        <p className="mt-2 text-sm font-semibold">Confirmado por {n} {n === 1 ? "viajero" : "viajeros"}</p>
                        <p className="text-sm text-azul/80">
                            Publicado el {new Date(aviso.createdAt).toLocaleString("es-AR", { dateStyle: "medium", timeStyle: "short" })}
                        </p>
                    </article>
                )
            })}
        </div>
    )
}
