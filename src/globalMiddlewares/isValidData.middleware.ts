import { Request, Response, NextFunction } from "express";
import { ClassValidatorConfig } from "../config/ClassValidator.config";
import { ClassConstructor } from "class-transformer";

export const isValidData = (dto: ClassConstructor<unknown>) => async (req: Request, res: Response, next: NextFunction) => {
    const validations = await new ClassValidatorConfig().validate(dto, req.body);

    if(validations.errors.length > 0) {
        return res.status(400).json(validations);
    }

    return next();
};