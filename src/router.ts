import { Router } from "express";
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter)

export default appRouter;