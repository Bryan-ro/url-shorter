import { Request, Response, Router } from "express";
import Service from "./User.service";
import { isLoggedIn, isValidData } from "../globalMiddlewares";
import { isUserExists, isUserNotExists } from "./middlewares";
import { CreateUserDto, UpdateProfileDto } from "./dto";

const service = new Service();
const router = Router();

export class UserController {
    public routes () {
        router.post("/create", isValidData(CreateUserDto), isUserExists, this.createUser);
        router.post("/login", this.login);
        router.put("/update", isLoggedIn, isValidData(UpdateProfileDto), this.updateProfile);
        router.patch("/password/reset/:email", isUserNotExists, this.resetPassword);

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

    private async updateProfile(req: Request, res: Response) {
        const data: UpdateProfileDto = req.body;
        const userId = req.loginPayload.id;

        const update = await service.updateProfile(data, userId);

        return res.status(update.statusCode).json({ ...update });
    }

    private async resetPassword(req: Request, res: Response) {
        const userEmail = req.params.email;

        const passReset = await service.resetPassword(userEmail);
        
        return res.status(passReset.statusCode).json({ ...passReset });
    }
}

