import { Router } from "express";
import { UserController, UrlController } from "../controllers";

const router = Router();

router.use("/users", new UserController().routes());
router.use("/", new UrlController().routes());

export default router;