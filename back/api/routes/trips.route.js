import { Router } from "express"
import * as tripController from "../controllers/trips.controller.js"
import { validateTrip, validateTripPatch } from "../../middlewares/trips.validate.js"
import { validateToken } from "../../middlewares/auth.validate.js"
import { validateId } from "../../middlewares/id.validate.js"

const router = Router()

router.get("/api/viajes", [validateToken], tripController.getTrips)
router.get("/api/viajes/:id", [validateToken, validateId], tripController.getTripById)
router.post("/api/viajes", [validateToken, validateTrip], tripController.saveTrip)
router.put("/api/viajes/:id", [validateToken, validateId, validateTrip], tripController.replaceTrip)
router.patch("/api/viajes/:id", [validateToken, validateId, validateTripPatch], tripController.updateTrip)
router.delete("/api/viajes/:id", [validateToken, validateId], tripController.deleteTrip)

export default router
