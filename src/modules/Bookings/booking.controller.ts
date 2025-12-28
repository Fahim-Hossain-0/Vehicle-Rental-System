import { Request, Response } from "express";
import { create } from "node:domain";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    // const customer_id = req.params.id;

    const result = await bookingService.createBooking(req.body)
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result
    });
  } catch (error: any) {
    res
      .status(500)
      .json({
        success: false,
        message: error.message
      });
  }
}

const getAllBooking = async (req: Request, res: Response) => {
  try {

    const result = await bookingService.getAllBooking(req.user as any)
    res.status(201).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result
    });
  } catch (error: any) {
    res
      .status(500)
      .json({
        success: false,
        message: error.message
      });
  }
}



const updateBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.bookingId as string;
    const user = req.user as any;

    const result = await bookingService.updateBooking(
      bookingId,
      req.body,
      user
    );

    let message = "Booking updated successfully";

    if (req.body.status === "cancelled") {
      message = "Booking cancelled successfully";
    }

    if (req.body.status === "returned") {
      message = "Booking marked as returned. Vehicle is now available";
    }

    res.status(200).json({
      success: true,
      message,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



export const bookingController = {
  createBooking,
  getAllBooking,
  updateBooking
}