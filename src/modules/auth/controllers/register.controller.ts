import Joi from "joi";
import { Request, Response } from "express"
import db_connection from "../../../config/db.config.js";

export const registerSchema = Joi.object({
    username: Joi.string().min(4).max(10).required(),
    email: Joi.string().email().required(),
    first_name: Joi.string().min(2).max(100).required(),
    last_name: Joi.string().min(2).max(100).optional(),
    password: Joi.string().min(5).max(15).required()
});

const registerController = async (req: Request, res: Response) => {

    const { username, email, first_name, last_name, password } = req.body;

    const query = "INSERT INTO `users`(`username`, `first_name`, `last_name`, `email`, `password`, `user_role_id`) VALUES (?,?,?,?,?,?)";

    await db_connection.query(query, [username, first_name, last_name, email, password, 1])

    return res.json({
        message: "Successfully registered user"
    })

}

export default registerController;
