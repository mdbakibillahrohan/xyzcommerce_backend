import Joi from "joi";
import { Request, Response } from "express";
import db_connection from "../../../../config/db.config.js";

// ১. স্কিমা এবং কন্ট্রোলারের ফিল্ড নামগুলো সব এক রাখুন (সব জায়গায় 'description' এবং 'address')
export const vendorSchemas = {
    create: Joi.object({
        vendor_name: Joi.string().min(2).max(100).required(),
        vendor_address: Joi.string().max(255).allow(null, '').optional(), 
        description: Joi.string().max(255).allow(null, '').optional()
    }),
    update: Joi.object({
        vendor_name: Joi.string().min(2).max(100).optional(),
        vendor_address: Joi.string().max(255).allow(null, '').optional(),
        description: Joi.string().max(255).allow(null, '').optional()
    })
};

// ২. ক্রিয়েট কন্ট্রোলার
export const createVendorController = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const { vendor_name, vendor_address, description } = req.body;

        const query = `INSERT INTO vendors (vendor_name, vendor_address, description, created_by) VALUES (?, ?, ?, ?)`;
        
        // এখানে req.body থেকে সরাসরি নামগুলো ম্যাপ করা হয়েছে
        await db_connection.query(query, [vendor_name, vendor_address, description, userId]);
        res.status(201).json({ success: true, message: "Vendor created successfully" });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// ৩. আপডেট কন্ট্রোলার
export const updateVendorController = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const { vendor_id } = req.params; // আইডি ইউআরএল থেকে নেওয়া উত্তম
        const { vendor_name, vendor_address, description } = req.body;
        const query = `UPDATE vendors SET vendor_name = ?, vendor_address = ?, description = ?, updated_by = ? WHERE vendor_id = ?`;
        
        const [result]: any = await db_connection.query(query, [vendor_name, vendor_address, description, userId, vendor_id || req.body.vendor_id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Vendor not found" });
        
        res.json({ success: true, message: "Vendor updated successfully" });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
}