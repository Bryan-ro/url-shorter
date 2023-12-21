import express from "express";
import ErrorHandler from "./errors/ErrorHandler";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "https://click-counter-bryan-ro.vercel.app" }));
app.use(express.json());
app.use(routes);
app.use(ErrorHandler);


export default app;