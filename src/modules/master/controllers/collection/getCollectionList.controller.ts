
import Joi from "joi";

import { Request, Response } from "express";
import db_connection from "../../../../config/db.config.js";




export const getCollectionListSchema = Joi.object({
    searchText: Joi.string().optional(),
    offset: Joi.number().min(0).required(),
    limit: Joi.number().min(0).required()
})
export const getCollectionListController = async (req: Request, res: Response) => {
    const { searchText, offset, limit } = req.query;
    const dataParams = [];
    const countParams = [];

    let dataQuery = `select 
                        collection_id , 
                        collection_name, 
                        collection_descriptions 
                        from collections 
                        where 1 = 1`;

    let countQuery = `select 
                        count(*) as count 
                        from collections 
                        where 1 = 1`;

    if (searchText && searchText != "") {
        dataQuery += ` and collection_name like ?`;
        countQuery += ` and collection_name like ?`;
        dataParams.push(`%${searchText}%`);
        countParams.push(`%${searchText}%`);
    }
    dataQuery += ` order by collection_id desc`;
    dataQuery += ` LIMIT ? OFFSET ?`
    dataParams.push(Number(limit), Number(offset));

    const [collections] = await db_connection.query(dataQuery, dataParams);
    const [countData]: any = await db_connection.query(countQuery, countParams);

    res.json({ collections, count: countData[0].count });
}