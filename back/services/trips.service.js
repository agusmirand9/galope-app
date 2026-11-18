import { ObjectId } from "mongodb"
import { db } from "../config/db.js"

// Hoy en Argentina, formato AAAA-MM-DD (en-CA devuelve ese formato)
const hoy = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Argentina/Buenos_Aires" })

// "Este viaje, de este usuario, que no esté borrado"
const ownFilter = (id, usuarioId) => ({
    _id: new ObjectId(id),
    usuarioId: new ObjectId(usuarioId),
    eliminado: { $ne: true }
})

export async function getTrips(usuarioId, filtros = {}) {
    const filter = { usuarioId: new ObjectId(usuarioId), eliminado: { $ne: true } }

    if (filtros.estado === "proximos") filter.fechaVuelta = { $gte: hoy() }
    if (filtros.estado === "pasados") filter.fechaVuelta = { $lt: hoy() }

    const orden = filtros.estado === "pasados" ? -1 : 1   // pasados: el más reciente primero
    return await db.collection("viajes").find(filter).sort({ fechaIda: orden }).toArray()
}

export async function getTripById(id, usuarioId) {
    return await db.collection("viajes").findOne(ownFilter(id, usuarioId))
}

export async function saveTrip(viaje, usuarioId) {
    const nuevo = { ...viaje, usuarioId: new ObjectId(usuarioId), createdAt: new Date() }
    const { insertedId } = await db.collection("viajes").insertOne(nuevo)
    return { _id: insertedId, ...nuevo }
}

export async function replaceTrip(viaje, id, usuarioId) {
    const actual = await getTripById(id, usuarioId)
    if (!actual) return null

    const reemplazo = { ...viaje, usuarioId: actual.usuarioId, createdAt: actual.createdAt, updatedAt: new Date() }
    await db.collection("viajes").replaceOne({ _id: actual._id }, reemplazo)
    return { _id: actual._id, ...reemplazo }
}

export async function updateTrip(viaje, id, usuarioId) {
    return await db.collection("viajes").findOneAndUpdate(
        ownFilter(id, usuarioId),
        { $set: { ...viaje, updatedAt: new Date() } },
        { returnDocument: "after" }
    )
}

export async function deleteTripLogic(id, usuarioId) {
    return await db.collection("viajes").findOneAndUpdate(
        ownFilter(id, usuarioId),
        { $set: { eliminado: true, updatedAt: new Date() } },
        { returnDocument: "after" }
    )
}
