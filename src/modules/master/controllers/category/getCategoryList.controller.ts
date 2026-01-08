import { Request, Response } from "express"
import Joi from "joi";
import db_connection from "../../../../config/db.config.js";

export const getCategoryListSchema = Joi.object({
    searchText: Joi.string().optional(),
    offset: Joi.number().min(0).required(),
    limit: Joi.number().min(0).required()
})

export const getCategoryListController = async (req: Request, res: Response) => {
    const {searchText, limit, offset} = req.query;

    const dataParams = [];
    const countParams =[];

    let dataQuery = `select 
                        category_id , 
                        category_name, 
                        category_descriptions 
                        from categories 
                        where 1 = 1`;

    let countQuery = `select 
                        count(*) as count 
                        from categories 
                        where 1 = 1`;

    if(searchText && searchText!=""){
        dataQuery+=` and category_name like ?`;
        countQuery+=` and category_name like ?`;
        dataParams.push(`%${searchText}%`);
        countParams.push(`%${searchText}%`);
    }
    dataQuery+=` order by category_id desc`;
    dataQuery+=` LIMIT ? OFFSET ?`
    dataParams.push(Number(limit),Number(offset));

    const [categories] = await db_connection.query(dataQuery, dataParams);
    const [countData]:any = await db_connection.query(countQuery, countParams);

    res.json({ categories, count:countData[0].count });
}