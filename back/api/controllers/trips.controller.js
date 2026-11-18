import * as tripService from "../../services/trips.service.js"

export async function getTrips(req, res) {
    try {
        const viajes = await tripService.getTrips(req.usuario._id, req.query)
        res.status(200).json(viajes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function getTripById(req, res) {
    try {
        const viaje = await tripService.getTripById(req.params.id, req.usuario._id)
        if (viaje) res.status(200).json(viaje)
        else res.status(404).json({ message: "Viaje no encontrado" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function saveTrip(req, res) {
    try {
        const viaje = await tripService.saveTrip(req.body, req.usuario._id)
        res.status(201).json(viaje)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function replaceTrip(req, res) {
    try {
        const viaje = await tripService.replaceTrip(req.body, req.params.id, req.usuario._id)
        if (viaje) res.status(200).json(viaje)
        else res.status(404).json({ message: "Viaje no encontrado" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function updateTrip(req, res) {
    try {
        const viaje = await tripService.updateTrip(req.body, req.params.id, req.usuario._id)
        if (viaje) res.status(200).json(viaje)
        else res.status(404).json({ message: "Viaje no encontrado" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function deleteTrip(req, res) {
    try {
        const viaje = await tripService.deleteTripLogic(req.params.id, req.usuario._id)
        if (viaje) res.status(200).json(viaje)
        else res.status(404).json({ message: "Viaje no encontrado" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}
