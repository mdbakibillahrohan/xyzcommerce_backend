import db_connection from "../../../../config/db.config.js";
import { Request, Response } from "express";
import Joi from "joi";

export const getProductController = async (req: Request, res: Response) => {
    try {
       const { status } = req.query;
        let query = `
            SELECT 
                p.product_id, 
                p.product_name, 
                p.sku, 
                p.price, 
                p.stocks, 
                p.image_path,
                p.status,
                c.category_name, 
                v.vendor_name, 
                col.collection_name 
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            LEFT JOIN vendors v ON p.vendor_id = v.vendor_id
            LEFT JOIN collections col ON p.collection_id = col.collection_id
            
        `;
        const queryparams = [];

       if(status && status !== 'all'){
            query += " WHERE p.status = ? ";
            queryparams.push(status);
        }

        query += " ORDER BY p.product_id DESC ";

        const [rows] = await db_connection.query(query, queryparams);

        return res.status(200).json({       
            success: true,
            data: rows 
        });
    } catch (error: any) {
       
        console.error("Critical SQL Error:", error.sqlMessage || error.message); 
        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error", 
            details: error.sqlMessage 
        });
    }       
};

export const changeProductStatusController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // product_id
        const { status } = req.body; // 'published' or 'unpublished'

        const query = "UPDATE products SET status = ? WHERE product_id = ?";
        
        const [result] = await db_connection.query(query, [status, id]);

        if ((result as any).affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ 
            success: true, 
            message: `Product is now ${status}` 
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};