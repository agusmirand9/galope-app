export function validateId(req, res, next) {
    if (/^[0-9a-fA-F]{24}$/.test(req.params.id)) next()
    else res.status(400).json({ message: "El id no es válido" })
}
