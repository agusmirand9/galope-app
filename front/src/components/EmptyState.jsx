import { Link } from "react-router"

// Pantalla vacía: explica qué pasa y ofrece una acción
export default function EmptyState({ titulo, texto, to, accion }) {
    return (
        <div className="card text-center">
            <h2 className="text-lg font-bold">{titulo}</h2>
            <p className="mt-1 text-azul/80">{texto}</p>
            {to && <Link to={to} className="btn btn-primary mt-4">{accion}</Link>}
        </div>
    )
}
