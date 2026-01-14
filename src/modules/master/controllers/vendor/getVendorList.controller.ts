import Joi from "joi";
import { Request, Response } from "express";
import db_connection from "../../../../config/db.config.js";

export const getVendorListSchema = Joi.object(
    {
        searchText: Joi.string().optional(),
        offset: Joi.number().min(0).required(),
        limit: Joi.number().min(0).required()
    }
)
export const getVendorListController = async (req: Request, res: Response) => {
    let query = `select vendor_id , vendor_name, vendor_descriptions, address   from vendors`;
   const [result] = await db_connection.query(query);
    res.json({ vendors: result});
}