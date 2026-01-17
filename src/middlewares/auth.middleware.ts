import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import configuration from "../config/config.js";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  try {
    if (accessToken) {
      const userData = jwt.verify(accessToken, configuration.TOKEN_SECRET);
      req.user = userData;
      next();
      return;
    }

    return res
    .status(401)
      .json({
        message: "Unauthorized",
      });
  } catch (err:any) {
    console.log(err?.message)
    return res.status(401)
      .json({
        message: err?.message || "Unauthorized",
      });
  }
};

export default authMiddleware;
