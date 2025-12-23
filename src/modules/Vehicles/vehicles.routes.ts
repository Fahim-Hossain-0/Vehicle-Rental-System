import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router()

router.post('/vehicles',auth('admin') ,vehiclesController.createVehicles)

export const vehiclesRouter = router