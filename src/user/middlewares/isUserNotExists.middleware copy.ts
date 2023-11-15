import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import AppError from "../../errors/AppError";

const prisma = new PrismaClient();


export const isUserNotExists = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.params.email;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if(!user) {
        throw new AppError("E-mail does not exist");
    }

    return next();
};