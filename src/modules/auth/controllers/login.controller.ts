
import { Request, Response } from "express"
import Joi from "joi";


 export const loginSchema = Joi.object({
        username:  Joi.string().max(300).min(5).required(),
        password: Joi.string().max(20).min(5).required()
    })

const loginController = (req: Request, res: Response) => {
    res.json(req.body)
}

export default loginController;