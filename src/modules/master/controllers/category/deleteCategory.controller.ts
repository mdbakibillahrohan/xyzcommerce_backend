
import { Request, Response } from "express"
import db_connection from "../../../../config/db.config.js";
export const deleteCategoryController = async(req: Request, res: Response)=>{
    const {category_id} = req.params;
    let query = 'delete from categories where category_id = ?';

    await db_connection.execute(query, [category_id]);

    res.json({
        message: "Successfully deleted"
    });
}