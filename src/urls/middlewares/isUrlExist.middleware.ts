import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";

const prisma = new PrismaClient();

export const isUrlExist = async (req: Request, res: Response, next: NextFunction) => {
    const urlInfos = await prisma.shortUrl.findUnique({ where: { shortUrl: req.params.url } });

    if(!urlInfos) {
        return res.render("notFound");
    }

    return next();
};  