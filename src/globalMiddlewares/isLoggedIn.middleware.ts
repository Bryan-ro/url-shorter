import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import AppError from "../errors/AppError";

interface payloadProps {
    id: number,
    name: string
}

const prisma = new PrismaClient();

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    const credential = String(req.cookies["authorization"]).replace("Bearer ", "");
    
    try {
        const payload = jwt.verify(credential, String(process.env.JWT_SECRET));

        const user = await prisma.user.findUnique({
            where: {
                id: (payload as payloadProps).id
            }
        });

        if(!user) {
            throw new AppError("User has been deleted", 401);
        }

        req.loginPayload = payload as payloadProps;

        return next();
    } catch (error) {
        if(error instanceof JsonWebTokenError) {
            throw new AppError("Invalid token", 498);
        }
    }
};  