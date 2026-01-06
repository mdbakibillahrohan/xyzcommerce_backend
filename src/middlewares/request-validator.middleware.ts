import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
const requestValidatorMiddleware = (schema: ObjectSchema) => {

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            let payload; 

            if(req.method=="GET"){
                payload = req.query;
            }else if(req.method=="POST" || req.method=="PUT" || req.method=="PATCH"){
                payload = req.body;
            }

            const { error } = schema.validate(payload);
            if (error) {
                return res.status(400).json({
                    status: 400,
                    message: error?.message
                })
            }
            next();
        } catch (err: any) {
            res.status(400).json({
                status: 400,
                message: err.message
            });
        }
    }
}


export default requestValidatorMiddleware;
