import bcrypt from "bcrypt"
import { db } from "../config/db.js"
import { createToken } from "./token.service.js"

export async function saveUser(usuario) {
    const email = usuario.email.toLowerCase()
    const existe = await db.collection("usuarios").findOne({ email })
    if (existe) throw new Error("EMAIL_EXISTS")

    const nuevo = {
        name: usuario.name,
        email,
        password: await bcrypt.hash(usuario.password, 10),
        rol: "user",
        createdAt: new Date()
    }
    try {
        const { insertedId } = await db.collection("usuarios").insertOne(nuevo)
        return { _id: insertedId, name: nuevo.name, email: nuevo.email, rol: nuevo.rol }
    } catch (error) {
        // El índice único frenó un email repetido que se coló entre el findOne y el insertOne
        if (error.code === 11000) throw new Error("EMAIL_EXISTS")
        throw error
    }
}

export async function login(usuario) {
    const usuarioDB = await db.collection("usuarios").findOne({ email: usuario.email.toLowerCase() })
    if (!usuarioDB) throw new Error("BAD_CREDENTIALS")

    const ok = await bcrypt.compare(usuario.password, usuarioDB.password)
    if (!ok) throw new Error("BAD_CREDENTIALS")

    return {
        _id: usuarioDB._id,
        email: usuarioDB.email,
        name: usuarioDB.name,
        rol: usuarioDB.rol,
        token: createToken(usuarioDB)
    }
}
