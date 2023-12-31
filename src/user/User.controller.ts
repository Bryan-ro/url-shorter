import { Request, Response, Router } from "express";
import Service from "./User.service";
import { isLoggedIn, isValidData } from "../globalMiddlewares";
import { isUserExists, isUserNotExists } from "./middlewares";
import { CreateUserDto, UpdateProfileDto } from "./dto";

const service = new Service();
const router = Router();

export class UserController {
    public routes () {
        router.get("/profile", isLoggedIn, this.getOwnProfile);
        router.post("/create", isValidData(CreateUserDto), isUserExists, this.createUser);
        router.post("/login", this.login);
        router.post("/already-logged-in", isLoggedIn, this.alreadyLoggedIn);
        router.post("/log-out", isLoggedIn, this.logOut);
        router.put("/update", isLoggedIn, isValidData(UpdateProfileDto), this.updateProfile);
        router.patch("/password/reset/:email", isUserNotExists, this.resetPassword);

        return router;
    }

    private async getOwnProfile(req: Request, res: Response) {
        const userId = req.loginPayload.id;

        const user = await service.getOwnProfile(userId);

        return res.status(user.statusCode).json({ ...user });
    }

    private async createUser(req: Request, res: Response) {
        const data: CreateUserDto = req.body;

        const create = await service.createUser(data);

        return res.status(create.statusCode).json({ ...create });
    }

    private async login (req: Request, res: Response) {
        const credentials = req.headers["authorization"] as string;

        const login = await service.login(credentials);

        return res.status(login.statusCode).cookie("authorization", login.token, {
            httpOnly: true,
            maxAge: 604800000,
            sameSite: "none",
            secure: true
        }).json(login.message);
    }

    private alreadyLoggedIn(req: Request, res: Response) {
        return res.status(200).json({ message: "User already logged-in", user: req.loginPayload.name, statusCode: 200 })
    }

    private logOut(req: Request, res: Response) {
        res.cookie("authorization", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: "none",
            secure: true
        }).json({ message: "User logged-out" });
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

