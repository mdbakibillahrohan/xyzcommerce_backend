import { Router } from "express";
import requestValidatorMiddleware from "../../middlewares/request-validator.middleware.js";
import { createCategoryController, createCategorySchema } from "./controllers/category/createCategory.controller.js";
import { getCategoryListController, getCategoryListSchema } from "./controllers/category/getCategoryList.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const masterRouter = Router();

masterRouter.post("/category",authMiddleware, requestValidatorMiddleware(createCategorySchema), createCategoryController);
masterRouter.get("/category",requestValidatorMiddleware(getCategoryListSchema), getCategoryListController);

export default masterRouter;