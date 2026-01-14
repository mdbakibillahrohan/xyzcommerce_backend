   import { Request, Response } from 'express';
   import db_connection from '../../../../config/db.config.js';

    export const deleteVendorController = async (req: Request, res: Response) => {
        const { vendor_id } = req.params;
        const query=  'DELETE FROM vendors WHERE vendor_id = ?';
        await db_connection.execute(query, [vendor_id]);

        res.json({
            message: 'Successfully deleted'
        });
    }