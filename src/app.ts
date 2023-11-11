import express from "express";
import ErrorHandler from "./errors/ErrorHandler";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(ErrorHandler);

export default app;