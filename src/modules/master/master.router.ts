import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";


// Controllers
import { createCategoryController, createCategorySchema } from "./controllers/category/createCategory.controller.js";
import { getCategoryListController, getCategoryListSchema } from "./controllers/category/getCategoryList.controller.js";
import { createCollectionController, createCollectionSchema } from "./controllers/category/createCollection.controller.js";
import { getCollectionListSchema, getCollectionListController } from "./controllers/category/getCollectionList.controller.js";
import { createVendorController, updateVendorController, vendorSchemas } from "./controllers/category/createVendor.controller.js";
import { getVendorListController } from "./controllers/category/getVendorList.controller.js";
import requestValidatorMiddleware from "../../middleware/request-validator.middleware.js";

const masterRouter = Router();

// Category Routes
masterRouter.post("/category", authMiddleware, requestValidatorMiddleware(createCategorySchema), createCategoryController);
masterRouter.get("/category", requestValidatorMiddleware(getCategoryListSchema), getCategoryListController);

// Collection Routes
masterRouter.post("/collection", authMiddleware, requestValidatorMiddleware(createCollectionSchema), createCollectionController);
masterRouter.get("/collection", requestValidatorMiddleware(getCollectionListSchema), getCollectionListController);


masterRouter.post("/vendor", authMiddleware, requestValidatorMiddleware(vendorSchemas.create), createVendorController);
masterRouter.put("/vendor", authMiddleware, requestValidatorMiddleware(vendorSchemas.update), updateVendorController);

masterRouter.get("/vendor", requestValidatorMiddleware(vendorSchemas.update), getVendorListController);



export default masterRouter; 