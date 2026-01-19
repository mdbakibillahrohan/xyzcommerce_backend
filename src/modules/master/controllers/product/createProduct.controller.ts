import db_connection from "../../../../config/db.config.js";
import { Request, Response } from "express";
import Joi from "joi";

export const createProductSchema = Joi.object({
    productInfo: Joi.object({
        name: Joi.string().min(2).max(100).required(),
        sku: Joi.string().required(),
        weight: Joi.number().min(0).optional(),
         product_descriptions: Joi.string().allow('').optional(),
    }).required(),
    price: Joi.object({
        amount: Joi.number().min(0).required(),
        currency: Joi.string().default('BDT'),
    }).required(),
    uploadedImagePath: Joi.string().allow(null).optional(),
    organization: Joi.object({
        vendor_id: Joi.number().optional(),
        category_id: Joi.number().integer().required(),
        collection_id: Joi.number().optional()
    }).required()
});
export const createProductController = async (req: Request, res: Response) => {
    try {
       
        const { productInfo, price, uploadedImagePath, organization } = req.body;
        
      
        const userId = req.user?.id; 
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User ID not found" });
        }

        const query = `
            INSERT INTO products 
            (product_name, sku, weight, product_descriptions, price, currency, image_path, vendor_id, category_id, created_by) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            productInfo.name,        
            productInfo.sku,         
            productInfo.weight || 0,     
            productInfo.product_descriptions || '', 
            price.amount,            
            price.currency || 'BDT',
            uploadedImagePath || null,       
            organization.vendor_id || 0,
            organization.category_id || 0,
            userId
        ];

        const [result] = await db_connection.query(query, values);
        
        return res.status(201).json({ 
            success: true,
            message: "Product created successfully", 
            productId: (result as any).insertId 
        });

    } catch (error: any) {
        console.error("Database Error:", error);
        return res.status(500).json({ 
            success: false,
            message: "Internal Server Error", 
            error: error.message 
        });
    }
}