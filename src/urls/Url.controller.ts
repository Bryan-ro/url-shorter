import { Request, Response, Router } from "express";
import Service from "./Url.service";

const service = new Service();
const router = Router();

export class UrlController {
    public routes () {
        
        return router;
    }

    private async createRandomUrl (req: Request, res: Response) {
        // const originalUrl = 
    }
}