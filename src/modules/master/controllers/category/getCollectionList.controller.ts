
import Joi from "joi";

import { Request, Response } from "express";
import db_connection from "../../../../config/db.config.js";
export const getCollectionListSchema = Joi.object()
export const getCollectionListController = async (req: Request, res: Response) => {
    let query = `select collection_id , collection_name, collection_descriptions   from collections`;
   const [result] = await db_connection.query(query);
    res.json({ collections: result });
}