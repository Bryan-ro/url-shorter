import { PrismaClient } from "@prisma/client";
import { CreateRandomUrlDto, CreateCustomUrlDto } from "../urls/dto";
import generateUrl from "../utils/passwordGenerator";
import AppError from "../errors/AppError";

const prisma = new PrismaClient();

export default class UrlService {
    public async generateRandomShortUrl(data: CreateRandomUrlDto, serverUrl: string, user?: { id: number, name: string }) {
        let url = "";
        let validUrl = false;
        
        while (!validUrl) {
            url = generateUrl({
                length: 8,
                lowerCase: true,
                upperCase: true
            });

            await prisma.shortUrl.findUnique({
                where: {
                    shortUrl: url
                }
            }) ? false : validUrl = true;
        }

        await prisma.shortUrl.create({
            data: {
                originalUrl: data.originalUrl,
                shortUrl: url,
                userId: user?.id
            }
        });

        return { 
            data: {
                shortUrl: `${serverUrl}/${url}`,
                originalUrl: data.originalUrl,
            },
            statusCode: 200
        };
    }

    public async generateCustomUrl (data: CreateCustomUrlDto, serverUrl: string, user: { id: number, name: string }) {
        const ifUrlExist = await prisma.shortUrl.findUnique({
            where: {
                shortUrl: data.customUrl
            }
        });

        if(ifUrlExist) {
            throw new AppError("Try a other url");
        }

        await prisma.shortUrl.create({
            data: {
                originalUrl: data.originalUrl,
                shortUrl: data.customUrl,
                userId: user.id
            }
        });

        return { 
            data: {
                shortUrl: `${serverUrl}/${data.customUrl}`,
                originalUrl: data.originalUrl
            },
            statusCode: 200
        };
    }
}