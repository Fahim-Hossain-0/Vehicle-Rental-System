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

const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        const result = await userServices.updateUser(req.body, userId as string)

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "user updated successfully",
            data: result.rows[0]
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const result = await userServices.deleteUser(userId as string)

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            })
        }

        return res.status(200).json({
            success: true,
            msg: "users deleted successfully",
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

export const userControllers = {
  getAllUsers,
  updateUser,
  deleteUser
}