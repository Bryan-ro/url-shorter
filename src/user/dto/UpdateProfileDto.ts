import { IsStrongPassword, Length, IsEmail, IsPhoneNumber, IsString, IsOptional } from "class-validator";


export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @Length(4, 100)
        name?: string;
        
    @IsOptional()
    @IsEmail()
        email?: string;

    @IsOptional()
    @IsPhoneNumber("BR")
        phone?: string;


    @IsOptional()
    @IsStrongPassword({ minLength: 6, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 0 })
        newPassword!: string;
    
    @IsString()
        currentPassword!: string;
}