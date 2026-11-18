import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGO_URI)
export const db = client.db(process.env.DB_NAME)

// Índice único: la base misma impide dos usuarios con el mismo email,
// incluso si dos registros llegan al mismo tiempo (code 11000 = clave duplicada).
db.collection("usuarios")
    .createIndex({ email: 1 }, { unique: true })
    .catch(error => console.error("No se pudo crear el índice único de email:", error.message))
