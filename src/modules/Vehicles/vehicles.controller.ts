import { Request, Response } from "express";
import { vehicleService } from "./vehicles.service";

const createVehicles = async(req:Request,res:Response)=>{
    try {
        const result = await vehicleService.createVehicles(req.body)
         res.status(200).json({
            success: true,
            message: "vehicle registered successfully",
            data: result
        })
    } catch (error:any) {
            res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllVehicles = async(req:Request,res:Response)=>{
    try {
        const result = await vehicleService.getAllVehicles()
        res.status(200).json({
            success:true,
            message: "Vehicles retrieved successfully",
            data:result
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const getSingleVehicles = async(req:Request,res:Response)=>{
    try {
          const { vehicleId } = req.params;

    const result = await vehicleService.getSingleVehicles(vehicleId as string);
        res.status(200).json({
            success:true,
            message: "Vehicles retrieved successfully",
            data:result
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateVehicles = async(req:Request,res:Response)=>{
    try {
        const { vehicleId } = req.params;
        const result = await vehicleService.updateVehicles(req.body,vehicleId as string) 
        if (result.rows.length === 0) {

            res.status(404).json({
                success: false,
                message: 'vehicle not found'
            });

        }
        else {
            res.status(200).json({
                success: true,
                msg: "vehicle updated successfully",
                data: result.rows[0]
            })
        }


    } catch (error: any) {
       res.status(500).json({
            success: false,
            msg: error.massage,
            details: error
        })
    }
}

const deleteVehicles = async (req: Request, res: Response) => {
    try {
        const { vehicleId } = req.params;
        const result = await vehicleService.deleteVehicles(vehicleId as string)

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'vehicle not found'
            })
        }

        return res.status(200).json({
            success: true,
            msg: "vehicle deleted successfully",
            data: null,
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            msg: error.message,
            details: error
        })
    }
}


export const vehiclesController = {
    createVehicles,
    getAllVehicles,
    getSingleVehicles,
    updateVehicles,
    deleteVehicles
}