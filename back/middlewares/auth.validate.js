import { validateToken as validateTokenService } from "../services/token.service.js"

export function validateToken(req, res, next) {
    try {
        const token = req.headers.authorization
        req.usuario = validateTokenService(token)
        next()
    } catch (error) {
        res.status(401).json({ message: "Usuario no autorizado" })
    }
}

export function validateRoles(roles) {
    return (req, res, next) => {
        if (roles.includes(req.usuario.rol)) next()
        else res.status(403).json({ message: "No tenés permiso para esta acción" })
    }
}
