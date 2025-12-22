import { Router } from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";


const router = Router()

router.get('/users',auth('admin'), userControllers.getAllUsers)

export const userRouters = router