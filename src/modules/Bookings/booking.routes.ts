import { Router } from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";

const router = Router()

router.post('/bookings',auth('admin','customer'), bookingController.createBooking)

router.get('/bookings',auth('admin','customer'), bookingController.getAllBooking)
router.put('/bookings/:bookingId',auth('admin','customer'), bookingController.updateBooking)


export const bookingRouter = router