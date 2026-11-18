import { ObjectId } from "mongodb"
import { db } from "../config/db.js"
import { TIPOS_AVISO } from "../schemas/alerts.js"

const HORAS_VIGENCIA = 24
const LIMITE_POR_HORA = 5
const UNA_HORA = 60 * 60 * 1000

const nuevoVencimiento = () => new Date(Date.now() + HORAS_VIGENCIA * UNA_HORA)

// "No borrado y todavía no vencido"
const vigente = () => ({ eliminado: { $ne: true }, venceEn: { $gt: new Date() } })

// Lo que sale hacia el cliente: sin ids de personas, con datos ya calculados
function toPublic(aviso, usuarioId) {
    const yo = new ObjectId(usuarioId)
    const { confirmaciones = [], usuarioId: autor, ...resto } = aviso
    return {
        ...resto,
        totalConfirmaciones: confirmaciones.length,
        confirmadoPorMi: confirmaciones.some(c => c.equals(yo)),
        esMio: autor.equals(yo)
    }
}

export async function getAlerts(usuarioId, filtros = {}) {
    const filter = vigente()
    if (typeof filtros.tipo === "string" && TIPOS_AVISO.includes(filtros.tipo)) filter.tipo = filtros.tipo

    const avisos = await db.collection("avisos").find(filter).sort({ createdAt: -1 }).toArray()
    return avisos.map(aviso => toPublic(aviso, usuarioId))
}

export async function getAlertById(id, usuarioId) {
    const aviso = await db.collection("avisos").findOne({ _id: new ObjectId(id), ...vigente() })
    return aviso ? toPublic(aviso, usuarioId) : null
}

export async function saveAlert(aviso, usuarioId) {
    const autor = new ObjectId(usuarioId)

    const recientes = await db.collection("avisos").countDocuments({
        usuarioId: autor,
        createdAt: { $gte: new Date(Date.now() - UNA_HORA) }
    })
    if (recientes >= LIMITE_POR_HORA) throw new Error("RATE_LIMIT")

    const nuevo = {
        ...aviso,
        usuarioId: autor,
        confirmaciones: [],
        venceEn: nuevoVencimiento(),
        createdAt: new Date()
    }
    const { insertedId } = await db.collection("avisos").insertOne(nuevo)
    return toPublic({ _id: insertedId, ...nuevo }, usuarioId)
}

export async function updateAlert(aviso, id, usuarioId) {
    const actualizado = await db.collection("avisos").findOneAndUpdate(
        { _id: new ObjectId(id), usuarioId: new ObjectId(usuarioId), ...vigente() },
        { $set: { ...aviso, updatedAt: new Date() } },
        { returnDocument: "after" }
    )
    return actualizado ? toPublic(actualizado, usuarioId) : null
}

export async function deleteAlertLogic(id, usuarioId, rol) {
    const filter = { _id: new ObjectId(id), eliminado: { $ne: true } }
    if (rol !== "admin") filter.usuarioId = new ObjectId(usuarioId)   // el admin borra cualquiera

    const borrado = await db.collection("avisos").findOneAndUpdate(
        filter,
        { $set: { eliminado: true, updatedAt: new Date() } },
        { returnDocument: "after" }
    )
    return borrado ? toPublic(borrado, usuarioId) : null
}

export async function saveAlertConfirmation(id, usuarioId) {
    const yo = new ObjectId(usuarioId)

    // 1) Chequeos previos: sirven para dar un error claro en cada caso
    const aviso = await db.collection("avisos").findOne({ _id: new ObjectId(id), ...vigente() })
    if (!aviso) return null
    if (aviso.usuarioId.equals(yo)) throw new Error("OWN_ALERT")
    if (aviso.confirmaciones.some(c => c.equals(yo))) throw new Error("ALREADY_CONFIRMED")

    // 2) Escritura atómica: protege contra dos pedidos simultáneos de la misma persona
    const actualizado = await db.collection("avisos").findOneAndUpdate(
        { _id: aviso._id, ...vigente(), confirmaciones: { $ne: yo } },
        { $push: { confirmaciones: yo }, $set: { venceEn: nuevoVencimiento() } },
        { returnDocument: "after" }
    )
    if (!actualizado) throw new Error("ALREADY_CONFIRMED")
    return toPublic(actualizado, usuarioId)
}


