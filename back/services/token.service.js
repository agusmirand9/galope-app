import jwt from "jsonwebtoken"

export function createToken(usuario) {
    return jwt.sign({
        _id: String(usuario._id),
        email: usuario.email,
        name: usuario.name,
        rol: usuario.rol
    }, process.env.JWT_SECRET, { expiresIn: "2h" })
}

export function validateToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}
