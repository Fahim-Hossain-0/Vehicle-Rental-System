import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import auth from "../../middleware/auth";

const router = Router()

router.post('/vehicles', auth('admin'), vehiclesController.createVehicles)

router.get('/vehicles',vehiclesController.getAllVehicles)

router.get("/vehicles/:vehicleId",vehiclesController.getSingleVehicles)

router.put('/vehicles/:vehicleId',vehiclesController.updateVehicles)

export const vehiclesRouter = router