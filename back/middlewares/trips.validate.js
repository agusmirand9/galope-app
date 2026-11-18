import { tripsSchema, tripsPatchSchema } from "../schemas/trips.js"

export async function validateTrip(req, res, next) {
    try {
        req.body = await tripsSchema.parseAsync(req.body)
        next()
    } catch (errors) {
        const messages = errors.issues.map(error => error.path.length ? `${error.path}:${error.message}` : error.message)
        res.status(400).json(messages)
    }
}

export async function validateTripPatch(req, res, next) {
    try {
        req.body = await tripsPatchSchema.parseAsync(req.body)
        next()
    } catch (errors) {
        const messages = errors.issues.map(error => error.path.length ? `${error.path}:${error.message}` : error.message)
        res.status(400).json(messages)
    }
}
