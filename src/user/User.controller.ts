import { Request, Response, Router } from "express";
import Service from "./User.service";
import { isValidData } from "../globalMiddlewares";
import { isUserExists } from "./middlewares";
import { CreateUserDto } from "./dto";

const service = new Service();
const router = Router();

export class UserController {
    public routes () {
        router.post("/create", isValidData(CreateUserDto), isUserExists, this.createUser);
        router.post("/login", this.login);

        return router;
    }

    private async createUser(req: Request, res: Response) {
        const data: CreateUserDto = req.body;

        const create = await service.createUser(data);

        return res.status(create.statusCode).json({ ...create });
    }

    private async login (req: Request, res: Response) {
        const credentials = req.headers["authorization"] as string;

        const login = await service.login(credentials);

        return res.status(login.statusCode).json({ ...login });
    }
}

