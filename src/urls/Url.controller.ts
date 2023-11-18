import { Request, Response, Router } from "express";
import Service from "./Url.service";
import { CreateCustomUrlDto, CreateRandomUrlDto } from "./dto";
import { isLoggedIn, isValidData } from "../globalMiddlewares";
import { getUserId } from "./middlewares";

const service = new Service();
const router = Router();

export class UrlController {
    public routes () {
        router.post("/short/random", getUserId, isValidData(CreateRandomUrlDto),  this.generateRandomUrl);
        router.post("/short/custom", isLoggedIn, isValidData(CreateCustomUrlDto), this.generateCustomUrl)

        return router;
    }

    private async generateRandomUrl (req: Request, res: Response) {
        const data: CreateRandomUrlDto = req.body;
        const serverSecure = req.secure? "https://" : "http://";
        const serverUrl = req.headers.host;
        const userId = req.loginPayload ?? undefined;

        const shortUrl = await service.generateRandomShortUrl(data, serverSecure + serverUrl, userId);

        return  res.status(shortUrl.statusCode).json(shortUrl.data);
    }
    
    private async generateCustomUrl (req: Request, res: Response) {
        const data: CreateCustomUrlDto = req.body;
        const serverSecure = req.secure? "https://" : "http://";
        const serverUrl = req.headers.host;
        const userId = req.loginPayload;

        const shortUrl = await service.generateCustomUrl(data, serverSecure + serverUrl, userId);

        return  res.status(shortUrl.statusCode).json(shortUrl.data);
    }
}