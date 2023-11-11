import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../dto";
import AppError from "../../errors/AppError";

const prisma = new PrismaClient();


export const isUserExists = async (req: Request, res: Response, next: NextFunction) => {
    const data: CreateUserDto = req.body;

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    email: data.email
                },
                {
                    phone: data.phone
                }
            ]
        }
    });

    if(user) {
        throw new AppError("E-mail or phone already exists");
    }

    return next();
};