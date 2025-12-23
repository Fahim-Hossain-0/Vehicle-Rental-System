import { Request, Response } from "express";
import { vehicleService } from "./vehicles.service";

const createVehicles = async(req:Request,res:Response)=>{
    try {
        const result = await vehicleService.createVehicles(req.body)
         res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: result
        })
    } catch (error:any) {
            res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const vehiclesController = {
    createVehicles
}