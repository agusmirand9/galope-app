import { Navigate } from "react-router"
import { useRol, useUsuario } from "../context/session.context"

export default function ProtectedRoute({ element, rol = ["user", "admin"] }) {
    const usuario = useUsuario()
    const usuarioRol = useRol()
    if (usuario && rol.includes(usuarioRol)) return element
    if (usuario) return <Navigate to="/" replace />
    return <Navigate to="/login" replace />
}
