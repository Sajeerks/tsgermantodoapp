import express from  'express'
import * as userController from "../controllers/userController"
import { requireAuth } from '../middleware/auth'

const router = express.Router()

router.get("/authorisedUser", requireAuth,userController.getAuthenticatedUser)


router.post("/signup" , userController.signUp)
router.post("/login" , userController.login)


router.post("/logout" , userController.logout)
router.get("/sample" , userController.sample)



export default router