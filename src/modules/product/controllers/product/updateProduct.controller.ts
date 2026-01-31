    import { Request, Response } from "express";
import Joi from "joi";
 import db_connection from "../../../../config/db.config.js";    
 
export const updateProductSchema = Joi.object({
    product_name: Joi.string().max(100).required(),
    sku: Joi.string().max(50).required(),   
    price: Joi.number().precision(2).required(),
    stocks: Joi.number().integer().required(),
    category_id: Joi.number().integer().required(), 
    vendor_id: Joi.number().integer().required(),
    collection_id: Joi.number().integer().optional().allow(null),
    image_path: Joi.string().max(255).optional().allow(""),
});


export const updateProductController = async (req: Request, res: Response) => {
    try {
        const { product_id } = req.params;
        const { product_name, sku, price, stocks, category_id, vendor_id, collection_id, image_path } = req.body;   
        let query = `UPDATE products SET product_name = ?, sku = ?, price = ?, stocks = ?, category_id = ?, vendor_id = ?, collection_id = ?, image_path = ? WHERE product_id = ?`;
        await db_connection.query(query, [product_name, sku, price, stocks, category_id, vendor_id, collection_id, image_path, product_id]);
        
        return res.status(200).json({ message: 'Product updated successfully' });
    }   
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

