import { Router } from "express";
import requestValidatorMiddleware from "../../middlewares/request-validator.middleware.js";
import loginController, { loginSchema } from "./controllers/login.controller.js";
import registerController, { registerSchema } from "./controllers/register.controller.js";

const authRouter = Router();

authRouter.post("/login",requestValidatorMiddleware(loginSchema), loginController);
authRouter.post("/register", requestValidatorMiddleware(registerSchema), registerController);

export default authRouter;