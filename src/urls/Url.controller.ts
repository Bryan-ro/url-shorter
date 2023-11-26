import { Request, Response, Router } from "express";
import Service from "./Url.service";
import { CreateCustomUrlDto, CreateRandomUrlDto } from "./dto";
import { isLoggedIn, isValidData } from "../globalMiddlewares";
import { getUserId, isUrlExist } from "./middlewares";

const service = new Service();
const router = Router();

export class UrlController {
    public routes () {  
        router.get("/urls", isLoggedIn, this.getOwnUrls);
        router.get("/:url", isUrlExist, this.redirect);
        router.post("/short/random", getUserId, isValidData(CreateRandomUrlDto),  this.generateRandomUrl);
        router.post("/short/custom", isLoggedIn, isValidData(CreateCustomUrlDto), this.generateCustomUrl);
        router.delete("/delete/:shortUrl", isLoggedIn, this.deleteUrl);

        return router;
    }

    private async getOwnUrls (req: Request, res: Response) {
        const userId = req.loginPayload.id;
        const serverSecure = req.secure? "https://" : "http://";
        const serverUrl = req.headers.host;

        const urls = await service.getOwnUrls(userId, serverSecure+serverUrl);

        return res.status(urls.statusCode).json({ ...urls });
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

    private async redirect (req: Request, res: Response) {
        const shortUrl = req.params.url;

        const originalUrl = await service.redirect(shortUrl);
        
        return res.status(originalUrl.statusCode).redirect(originalUrl.originalUrl);
    }

    private async deleteUrl (req: Request, res: Response) {
        const shortUrl = req.params.shortUrl;
        const userId = req.loginPayload.id;

        const deletedUrl = await service.deleteUrl(userId, shortUrl);

        res.status(deletedUrl.statusCode).json({ ...deletedUrl });
    }
}