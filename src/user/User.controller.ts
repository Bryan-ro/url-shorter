import { Request, Response, Router } from "express";
import Service from "./User.service";
import isValidDataMiddleware from "../middlewares/shared/isValidData.middleware";
import { isUserExists } from "./middlewares";
import { CreateUserDto } from "./dto";

const service = new Service();
const router = Router();

export class UserController {
    public routes () {
        router.post("/create", isValidDataMiddleware(CreateUserDto), isUserExists, this.createUser);

        return router;
    }

    private async createUser(req: Request, res: Response) {
        const data: CreateUserDto = req.body;

        const create = await service.createUser(data);

        return res.status(create.statusCode).json({ ...create });
    }
}

