import { Request, Response } from "express"
import db_connection from "../../../config/db.config.js";

const userController = async(req:Request, res:Response)=>{

    const query = "select * from users where user_id = ?";

    const [result]:any = await db_connection.query(query, [req.user.id]);
    const user = result[0];
    
    res.json(user);
}

export default userController;