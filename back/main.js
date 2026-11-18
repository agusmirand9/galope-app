import "dotenv/config"            // SIEMPRE el primero: carga el .env antes que todo
import express from "express"
import cors from "cors"
import usersApiRoutes from "./api/routes/users.route.js"
import tripsApiRoutes from "./api/routes/trips.route.js"
import alertsApiRoutes from "./api/routes/alerts.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use(usersApiRoutes)
app.use(tripsApiRoutes)
app.use(alertsApiRoutes)

const PORT = process.env.PORT ?? 2026
app.listen(PORT, () => console.log(`Funcionando... http://localhost:${PORT}`))
