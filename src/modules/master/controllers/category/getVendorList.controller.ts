import Joi from "joi";
import { Request, Response } from "express";
import db_connection from "../../../../config/db.config.js";

export const getVendorListSchema = Joi.object()
export const getVendorListController = async (req: Request, res: Response) => {
    let query = `select vendor_id , vendor_name, vendor_address, description   from vendors`;
   const [result] = await db_connection.query(query);
    res.json({ vendors: result});
}