import * as alertService from "../../services/alerts.service.js"

export async function getAlerts(req, res) {
    try {
        const avisos = await alertService.getAlerts(req.usuario._id, req.query)
        res.status(200).json(avisos)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function getAlertById(req, res) {
    try {
        const aviso = await alertService.getAlertById(req.params.id, req.usuario._id)
        if (aviso) res.status(200).json(aviso)
        else res.status(404).json({ message: "Aviso no encontrado" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function saveAlert(req, res) {
    try {
        const aviso = await alertService.saveAlert(req.body, req.usuario._id)
        res.status(201).json(aviso)
    } catch (error) {
        if (error.message === "RATE_LIMIT") res.status(429).json({ message: "Llegaste al límite de avisos por hora. Probá más tarde" })
        else {
            console.error(error)
            res.status(500).json({ message: "Error interno del servidor" })
        }
    }
}

export async function updateAlert(req, res) {
    try {
        const aviso = await alertService.updateAlert(req.body, req.params.id, req.usuario._id)
        if (aviso) res.status(200).json(aviso)
        else res.status(404).json({ message: "Aviso no encontrado" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function deleteAlert(req, res) {
    try {
        const aviso = await alertService.deleteAlertLogic(req.params.id, req.usuario._id, req.usuario.rol)
        if (aviso) res.status(200).json(aviso)
        else res.status(404).json({ message: "Aviso no encontrado" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}

export async function saveAlertConfirmation(req, res) {
    try {
        const aviso = await alertService.saveAlertConfirmation(req.params.id, req.usuario._id)
        if (aviso) res.status(200).json(aviso)
        else res.status(404).json({ message: "Aviso no encontrado" })
    } catch (error) {
        if (error.message === "OWN_ALERT") res.status(403).json({ message: "No podés confirmar tu propio aviso" })
        else if (error.message === "ALREADY_CONFIRMED") res.status(409).json({ message: "Ya confirmaste este aviso" })
        else {
            console.error(error)
            res.status(500).json({ message: "Error interno del servidor" })
        }
    }
}

export async function getAlertsHistory(req, res) {
    try {
        const avisos = await alertService.getAlertsHistory(req.usuario._id)
        res.status(200).json(avisos)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error interno del servidor" })
    }
}
