
import { Request, Response } from "express"
import Joi from "joi";
import db_connection from "../../../config/db.config.js";

import jwt from "jsonwebtoken";
import configuration from "../../../config/config.js";

interface TokenInfo{
    id:Number,
    user_name:string
}


 export const loginSchema = Joi.object({
        usernameOrEmail:  Joi.string().max(300).min(5).required(),
        password: Joi.string().max(20).min(5).required(),
        remember: Joi.boolean().optional()
    })

const loginController = async(req: Request, res: Response) => {
    const {usernameOrEmail,password } = req.body;

    let query = `SELECT * FROM users WHERE username = ? OR email = ?`;

    const [result]:any = await db_connection.query(query,[usernameOrEmail, usernameOrEmail]);

    const user = result[0];
    if(user){
        if(user?.password!==password){
            return res.status(401).json({
                message: "Invalid credentials from xyzcommer"
            })
        }

        const token = generateToken({
            id: user.user_id,
            user_name: user.username
        })
        return res.json({
            message:"Successfully logged in",
            access_token: token
        })
    }

    return res.status(401).json({
        message:"Invalid credentials"
    });
}


const generateToken = (tokenInfo:TokenInfo)=>{
    const token = jwt.sign(tokenInfo, configuration.TOKEN_SECRET, {
        expiresIn: "1d"
    });
    return token;
}

export default loginController;