import * as userService from "../../services/users.service.js"

export async function saveUser(req, res) {
    try {
        const usuario = await userService.saveUser(req.body)
        res.status(201).json(usuario)
    } catch (error) {
        if (error.message === "EMAIL_EXISTS") res.status(409).json({ message: "El email ya está registrado" })
        else {
            console.error(error)
            res.status(500).json({ message: "Error interno del servidor" })
        }
    }
}

export async function login(req, res) {
    try {
        const usuario = await userService.login(req.body)
        res.status(200).json(usuario)
    } catch (error) {
        if (error.message === "BAD_CREDENTIALS") res.status(401).json({ message: "Email o contraseña incorrectos" })
        else {
            console.error(error)
            res.status(500).json({ message: "Error interno del servidor" })
        }
    }
}

// Ruta para verificar el token (útil para probar en Postman)
export function getMe(req, res) {
    res.status(200).json(req.usuario)
}
