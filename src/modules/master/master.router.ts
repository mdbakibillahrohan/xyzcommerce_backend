import { Router } from "express";


// Controllers
import { createCategoryController, createCategorySchema } from "./controllers/category/createCategory.controller.js";
import { getCategoryListController, getCategoryListSchema } from "./controllers/category/getCategoryList.controller.js";
import { createCollectionController, createCollectionSchema } from "./controllers/collection/createCollection.controller.js";
import { getCollectionListSchema, getCollectionListController } from "./controllers/collection/getCollectionList.controller.js";
import { createVendorController, updateVendorController, vendorSchemas } from "./controllers/vendor/createVendor.controller.js";
import { getVendorListController } from "./controllers/vendor/getVendorList.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import requestValidatorMiddleware from "../../middlewares/request-validator.middleware.js";
import { updateCategoryController, updateCategorySchema } from "./controllers/category/updateCategory.controller.js";
import { deleteCategoryController } from "./controllers/category/deleteCategory.controller.js";
import { updateCollectionController, updateCollectionSchema } from "./controllers/collection/updateCollection.controller.js";
import { deleteCollectionController } from "./controllers/collection/deleteCollection.controller.js";

const masterRouter = Router();

// Category Routes
masterRouter.post("/category", authMiddleware, requestValidatorMiddleware(createCategorySchema), createCategoryController);
masterRouter.get("/category", requestValidatorMiddleware(getCategoryListSchema), getCategoryListController);
masterRouter.put("/category/:category_id", authMiddleware, requestValidatorMiddleware(updateCategorySchema), updateCategoryController);
masterRouter.delete("/category/:category_id", authMiddleware, deleteCategoryController)

// Collection Routes
masterRouter.post("/collection", authMiddleware, requestValidatorMiddleware(createCollectionSchema), createCollectionController);
masterRouter.get("/collection", requestValidatorMiddleware(getCollectionListSchema), getCollectionListController);
masterRouter.put("/collection/:collection_id", authMiddleware, requestValidatorMiddleware(updateCollectionSchema), updateCollectionController);
masterRouter.delete("/collection/:collection_id", authMiddleware, deleteCollectionController)

// Vendor Routes
masterRouter.post("/vendor", authMiddleware, requestValidatorMiddleware(vendorSchemas.create), createVendorController);
masterRouter.put("/vendor", authMiddleware, requestValidatorMiddleware(vendorSchemas.update), updateVendorController);
masterRouter.get("/vendor", requestValidatorMiddleware(vendorSchemas.update), getVendorListController);



export default masterRouter; 