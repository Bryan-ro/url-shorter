import { PrismaClient } from "@prisma/client";
import { CreateUrlDto } from "../urls/dto";
import generateUrl from "../utils/passwordGenerator";

const prisma = new PrismaClient();

export default class UrlService {
    public async generateRandomShortUrl(data: CreateUrlDto, serverUrl: string, user?: number) {
        let url = "";
        let validUrl = false;
        
        while (validUrl) {
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
                userId: user
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
}