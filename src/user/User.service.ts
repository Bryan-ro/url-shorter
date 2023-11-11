import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "./dto";
import bcrypt from "bcrypt";

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
}

