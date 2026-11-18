import { alertsSchema, alertsPatchSchema } from "../schemas/alerts.js"

export async function validateAlert(req, res, next) {
    try {
        req.body = await alertsSchema.parseAsync(req.body)
        next()
    } catch (errors) {
        const messages = errors.issues.map(error => error.path.length ? `${error.path}:${error.message}` : error.message)
        res.status(400).json(messages)
    }
}

export async function validateAlertPatch(req, res, next) {
    try {
        req.body = await alertsPatchSchema.parseAsync(req.body)
        next()
    } catch (errors) {
        const messages = errors.issues.map(error => error.path.length ? `${error.path}:${error.message}` : error.message)
        res.status(400).json(messages)
    }
}
