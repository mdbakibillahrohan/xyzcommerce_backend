import { Router } from "express";
import authRouter from "./modules/auth/auth.router.js";

const appRouter = Router();

appRouter.use("/auth", authRouter);

export default appRouter;