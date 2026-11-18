import { Router } from "express"
import * as userController from "../controllers/users.controller.js"
import { validateUser, validateLogin } from "../../middlewares/users.validate.js"
import { validateToken } from "../../middlewares/auth.validate.js"

const router = Router()

router.post("/api/usuarios", [validateUser], userController.saveUser)
router.post("/api/usuarios/login", [validateLogin], userController.login)
router.get("/api/usuarios/me", [validateToken], userController.getMe)

export default router
