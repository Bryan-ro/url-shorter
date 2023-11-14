import { PrismaClient } from "@prisma/client";
import { CreateUserDto, UpdateProfileDto} from "./dto";
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

        return { message: "User logged in successfully", token: generateToken, user: user.name, statusCode: 200 };
    }

    public async updateProfile(data: UpdateProfileDto, userId: number) {
        const user = await prisma.user.findUnique({ where: { id: userId  } });

        const comparePassword = await bcrypt.compare(data.currentPassword, user?.password || "");

        if(!comparePassword) {
            throw new AppError("Invalid password");
        }

        const newHashPassword = data.newPassword ? await bcrypt.hash(data.newPassword, 7) : undefined;

        await prisma.user.update({
            where: { id: userId },
            data: {
                name: data.name, 
                email: data.email,
                phone: data.phone,
                password: newHashPassword
            }
        });
        
        
        return { message: "Profile successfully updated", statusCode: 200 };
    }

    public async resetPassword(){}
}

