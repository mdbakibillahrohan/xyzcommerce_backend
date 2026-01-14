import { Response,Request } from "express";
import db_connection from "../../../../config/db.config.js";
import  Joi from "joi";

export const updateVendorSchema = Joi.object({
  
  vendor_name: Joi.string().min(2).max(100).optional(),
  vendor_descriptions: Joi.string().max(255).optional().allow(""),
  address: Joi.string().max(255).optional(),
 
});

export const updateVendorController = async (req: Request, res: Response) => {
  try {
    const { vendor_id } = req.params;
    const { vendor_name, vendor_descriptions, address } = req.body;

    let query = `UPDATE vendors SET vendor_name = ?, vendor_descriptions = ?, address = ? WHERE vendor_id = ?`;
    await db_connection.execute(query, [vendor_name, vendor_descriptions, address, vendor_id]);
    res.json({
      message: "Successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating vendor",
    });
  } 
}