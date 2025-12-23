import Joi from "joi";
import { Request, Response } from "express"
import db_connection from "../../../../config/db.config.js";

export const createCategorySchema =  Joi.object({
    category_name: Joi.string().min(2).max(100).required(),
    category_descriptions: Joi.string().min(5).max(500).optional()
})
export const createCategoryController =  async (req: Request, res: Response) => {
    const userId = req.user.id;
    let query = `insert into  categories(category_name,category_descriptions, created_by) values (?,?,?)`;
    const [result] = await db_connection.query(query, [req.body.category_name, req.body.category_descriptions, userId]);
    res.json({ message: "Category created successfully"});
} 