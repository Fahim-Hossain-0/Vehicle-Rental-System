import { Router } from "express";
import { authController } from "./auth.controller";


const router = Router()

router.post('/auth/signup',authController.signup)
router.post('/auth/signin', authController.signIn)


export const authRouters = router