import { Request, Response } from "express"
import { userServices } from "./user.service"

 const getAllUsers = async(req:Request,res:Response)=>{
  


   
   
 try {
        const result = await userServices.getAllUsers()

        res.status(201).json({
            success: false,
            message: "Users retrieved successfully",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


    }



export const userControllers = {
  getAllUsers
}