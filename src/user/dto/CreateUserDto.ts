import { IsStrongPassword, Length, IsEmail, IsPhoneNumber, IsString } from "class-validator";


export class CreateUserDto {
    @IsString()
    @Length(4, 100)
        name!: string;
        
    @IsEmail()
        email!: string;

    @IsPhoneNumber("BR")
        phone!: string;

    @IsStrongPassword({ minLength: 6, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 0 })
        password!: string;
}