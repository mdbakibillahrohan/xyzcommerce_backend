import Joi from "joi";
import { Request, Response } from "express";
import db_connection from "../../../../config/db.config.js";

export const createCategorySchema = Joi.object({
  category_name: Joi.string().max(100).required(),
  category_descriptions: Joi.string().max(255).optional().allow(""),
});

export const createCategoryController = async (req:Request, res:Response) => {
  const userId = req.user?.id;
  const { category_name, category_descriptions } = req.body;
  let query = `insert into categories (category_name, category_descriptions, created_by) values (?, ?, ?)`;
   await db_connection.query(query, [category_name, category_descriptions, userId]);
  res.json({ message: "Category created successfully" })
};