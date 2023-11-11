import { Router } from "express";
import { UserController } from "../controllers";

const router = Router();

router.use("/users", new UserController().routes());

export default router;