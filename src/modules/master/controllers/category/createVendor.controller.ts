
import Joi from "joi";
import { Request, Response } from "express";
import db_connection from "../../../../config/db.config.js";
export const vendorSchemas = {
    create: Joi.object({
        vendor_name: Joi.string().min(2).max(100).required(),
        vendor_address: Joi.string().min(5).max(100).optional(),
        description: Joi.string().min(5).max(100).optional()
    }),
    update: Joi.object({
        vendor_name: Joi.string().min(2).max(100).optional(),
        vendor_address: Joi.string().min(5).max(100).optional(),
        description: Joi.string().min(5).max(100).optional()
    })
};

export const createVendorController = async (req: Request, res: Response) => {
    const userId = req.user.id;
    let query = `INSERT INTO vendors (vendor_name, vendor_address, description, created_by) VALUES (?, ?, ?, ?)`;
    const [result] = await db_connection.query(query, [req.body.vendor_name, req.body.vendor_address, req.body.description, userId]);

    res.json({ message: "Vendor created successfully" });
}

// export const updateVendorSchema = Joi.object({
//     vendor_id: Joi.number().required(),
//     vendor_name: Joi.string().required(),
//     vendor_address: Joi.string().required(),
//     description: Joi.string().required()
// });

export const updateVendorController = async (req: Request, res: Response) => {
    const userId = req.user.id;
    let query = `UPDATE vendors SET vendor_name = ?, vendor_address = ?, description = ?, updated_by = ? WHERE vendor_id = ?`;
    const [result]:any = await db_connection.query(query, [req.body.vendor_name, req.body.vendor_address, req.body.description, userId, req.body.vendor_id]);
  if (result.affectedRows === 0) return res.status(404).json({ message: "Vendor not found" });
        res.json({ success: true, message: "Vendor updated successfully" });
}