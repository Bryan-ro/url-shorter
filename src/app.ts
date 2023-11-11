import express from "express";
import databaseConfig from "./config/database.config";
import ErrorHandler from "./errors/ErrorHandler";
import "express-async-errors";
import path from "path";
import cors from "cors";

databaseConfig.initialize()
	.then(() => {
		console.log("Database suscessfully initialized");
	})
	.catch((error) => {
		console.error("Database connect failed"  + error);
	});

const app = express();
app.use(cors())

app.use(express.json());
app.use(ErrorHandler);

export default app;