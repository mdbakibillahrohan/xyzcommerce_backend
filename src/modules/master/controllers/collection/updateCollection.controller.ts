import { Request,Response } from "express";
import Joi from "joi";
import db_connection from "../../../../config/db.config.js";

export const updateCollectionSchema = Joi.object({
    collection_name: Joi.string().max(100).required(),
    collection_descriptions: Joi.string().max(255).optional().allow(""),
});

export const updateCollectionController = async (req: Request, res: Response) => {
    try{
     const { collection_id } = req.params;
     const { collection_name, collection_descriptions } = req.body;
        let query = `update collections set collection_name = ?, collection_descriptions = ? where collection_id = ?`;
        await db_connection.execute(query, [collection_name, collection_descriptions, collection_id]);
        res.json({
            message: "Successfully updated"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating collection"
        });
    }
}