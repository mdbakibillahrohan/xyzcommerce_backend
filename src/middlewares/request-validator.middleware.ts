import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
const requestValidatorMiddleware = (schema: ObjectSchema) => {

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error } = schema.validate(req.body);
            if (error) {
                return res.json({
                    status: 400,
                    message: error?.message
                })
            }
            next();
        } catch (err: any) {
            res.json({
                status: 400,
                message: err.message
            })
        }
    }
}


export default requestValidatorMiddleware;
