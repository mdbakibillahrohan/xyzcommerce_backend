import { Router } from "express";
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import masterRouter from "./modules/master/master.router.js";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter);
appRouter.use("/master", masterRouter);

export default appRouter;