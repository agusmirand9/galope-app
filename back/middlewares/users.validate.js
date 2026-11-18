import { usersRegisterSchema, usersLoginSchema } from "../schemas/users.js"

export async function validateUser(req, res, next) {
    try {
        req.body = await usersRegisterSchema.parseAsync(req.body)
        next()
    } catch (errors) {
        const messages = errors.issues.map(error => error.path.length ? `${error.path}:${error.message}` : error.message)
        res.status(400).json(messages)
    }
}

export async function validateLogin(req, res, next) {
    try {
        req.body = await usersLoginSchema.parseAsync(req.body)
        next()
    } catch (errors) {
        const messages = errors.issues.map(error => error.path.length ? `${error.path}:${error.message}` : error.message)
        res.status(400).json(messages)
    }
}
