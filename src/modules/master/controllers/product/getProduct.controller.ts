import db_connection from "../../../../config/db.config.js";
import { Request, Response } from "express";
import Joi from "joi";

export const getProductController = async (req: Request, res: Response) => {
    try {
        const query = `SELECT * FROM products`;
        const [rows] = await db_connection.query(query);

        return res.status(200).json({       
            success: true,
            data: rows 
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }       
};