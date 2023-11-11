import { DataSource } from "typeorm";
import User from "../models/User";
import ShortUrl from "../models/ShortUrl";
import "dotenv/config";

export default new DataSource({
	type: "mysql",
	host: process.env.DATABASE_HOST,
	port: 3306,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	synchronize: true,
	logging: true,
	entities: [
		ShortUrl,
		User
	],
	subscribers: [],
	migrations: [],
});