import { Request, Response } from "express";
import db_connection from "../../../../config/db.config.js";


const getProductByIdController = async(req:Request, res:Response)=>{

    const query = "select * from products where product_id = ?";

    const [ rows ]:any = await db_connection.query(query, [req.params.product_id]);

    return res.status(200).json({
        data: rows[0],
        success: true
    })
}

export default getProductByIdController;