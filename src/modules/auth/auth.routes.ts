import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router()

router.post('/auth/signup',authController.signup)
// router.post('/api/v1/auth/signin',)


export const authRouters = router