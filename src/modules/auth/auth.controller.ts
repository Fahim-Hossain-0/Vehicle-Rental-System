import { Request, Response } from "express"
import { authServices } from "./auth.service"


const signup = async (req: Request, res: Response) => {
    try {
        const result = await authServices.signUp(req.body)
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



export const authController = {
signup
}