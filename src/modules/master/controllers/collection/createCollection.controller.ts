import { Request, Response } from "express";
import Joi from "joi";
import db_connection from "../../../../config/db.config.js";

export const createCollectionSchema =  Joi.object({
    collection_name: Joi.string().min(2).max(100).required(),
    collection_descriptions: Joi.string().min(5).max(500).optional()
})
export const createCollectionController = async (req: Request, res: Response) => {
    const userId = req.user.id;
    let query = `insert into  collections(collection_name,collection_descriptions, created_by) values (?,?,?)`;
    const [result] = await db_connection.query(query, [req.body.collection_name, req.body.collection_descriptions, userId]);
    res.json({ message: "Collection created successfully" });
}