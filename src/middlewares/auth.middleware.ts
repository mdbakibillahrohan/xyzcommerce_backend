import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import configuration from "../config/config.js";

const authMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    if(accessToken){
        const userData = jwt.verify(accessToken, configuration.TOKEN_SECRET);
        req.user = userData;
        next();
        return;
    }

    return res.json({
        message:"Unauthorized"
    }).status(401);
}

export default authMiddleware;