import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface payloadProps {
    id: number,
    name: string
}

export const getUserId = async (req: Request, res: Response, next: NextFunction) => {
    const credential = String(req.headers["authorization"]).replace("Bearer ", "");

    try {
        const payload = jwt.verify(credential, String(process.env.JWT_SECRET));

        req.loginPayload = payload as payloadProps;
    } catch (error) {}

    return next();
};  