import { Request, Response } from "express";
import Joi from "joi";
import db_connection from "../../../../config/db.config.js";


export const updateCategorySchema = Joi.object({
    category_name: Joi.string().max(100).required(),
    category_descriptions: Joi.string().max(255).optional().allow(""),
})

export const updateCategoryController = async (req: Request, res: Response) => {
    try {
        const { category_id } = req.params;
        const { category_name, category_descriptions } = req.body;
        
        let query = `update categories set category_name = ?, category_descriptions = ? where category_id = ?`;
        await db_connection.query(query, [category_name, category_descriptions, category_id]);
        
        return res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};