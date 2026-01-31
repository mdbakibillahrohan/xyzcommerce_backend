import db_connection
 from "../../../../config/db.config.js";
import { Request, Response } from "express";

export const deleteProductController = async (req: Request, res: Response) => {
  const productId = req.params.id;
  let query = 'DELETE FROM products WHERE product_id = ?';

    await db_connection.execute(query, [productId]);

    res.json({
        message: "Product deleted successfully"
    });;
}

     

