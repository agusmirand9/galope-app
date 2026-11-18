import { Router } from "express"
import * as alertController from "../controllers/alerts.controller.js"
import { validateAlert, validateAlertPatch } from "../../middlewares/alerts.validate.js"
import { validateToken, validateRoles } from "../../middlewares/auth.validate.js"
import { validateId } from "../../middlewares/id.validate.js"

const router = Router()

router.get("/api/avisos", [validateToken], alertController.getAlerts)
router.get("/api/avisos/:id", [validateToken, validateId], alertController.getAlertById)
router.post("/api/avisos", [validateToken, validateAlert], alertController.saveAlert)
router.patch("/api/avisos/:id", [validateToken, validateId, validateAlertPatch], alertController.updateAlert)
router.delete("/api/avisos/:id", [validateToken, validateId], alertController.deleteAlert)
router.post("/api/avisos/:id/confirmaciones", [validateToken, validateId], alertController.saveAlertConfirmation)

export default router
