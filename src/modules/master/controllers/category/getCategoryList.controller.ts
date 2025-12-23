import Joi from "joi";

import { Request, Response } from "express";
import db_connection from "../../../../config/db.config.js";

export const getCategoryListSchema = Joi.object();

export const getCategoryListController = async(req:Request, res:Response) => {
    let query = `select category_id, category_name, category_descriptions   from categories `;
    const [result] = await db_connection.query(query);
  res.json({ categories: result });
}