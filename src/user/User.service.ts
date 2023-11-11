import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "./dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";
import "dotenv/config";

const prisma = new PrismaClient();

export default class UserService {
    public async createUser (user: CreateUserDto) {
        await prisma.user.create({ 
            data: { 
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: await bcrypt.hash(user.password, 7)
            } 
        });

        return { message: "User successfully created", statusCode: 201 };
    }

    public async login (credentials: string) {
        const buffer = Buffer.from((credentials).split(" ")[1], "base64").toString("utf-8");

        const [ email, password ] = buffer.split(":");

        const user = await prisma.user.findUnique({ where: { email: email } });

        if(!user) {
            throw new AppError("Email does not exists.", 400);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            throw new AppError("Invalid email or password", 401);
        }

        const generateToken = jwt.sign({
            id: user.id,
            name: user.name
        },
        `${process.env.JWT_SECRET}`,
        {
            expiresIn: "240h"
        });

        return { message: "User logged in successfully", token: generateToken, statusCode: 200 };
    }
}

