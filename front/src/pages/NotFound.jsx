import EmptyState from "../components/EmptyState"

export default function NotFound() {
    return <EmptyState titulo="Esta ruta no existe" texto="Revisá la dirección o volvé al inicio." to="/" accion="Ir al inicio" />
}
