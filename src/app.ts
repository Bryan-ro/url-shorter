import express from "express";
import ErrorHandler from "./errors/ErrorHandler";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";
import path from "path";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(ErrorHandler);

export default app;