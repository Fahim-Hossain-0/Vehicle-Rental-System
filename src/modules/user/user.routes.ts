import { Router } from "express";
import { userControllers } from "./user.controller";


const router = Router()

router.get('/users',userControllers.getAllUsers)

export const userRouters = router