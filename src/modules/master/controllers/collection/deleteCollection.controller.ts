import { Request, Response } from "express";
import db_connection from "../../../../config/db.config.js";

export const deleteCollectionController = async (req: Request, res: Response) => {
    const { collection_id } = req.params;
    const query = 'DELETE FROM collections WHERE collection_id = ?';
    await db_connection.execute(query, [collection_id]);

    res.json({
        message: "Successfully deleted"
    });
}