import { IsOptional, IsString, IsUrl, Length, MaxLength } from "class-validator";

export class CreateCustomUrlDto {
    @IsUrl()
        originalUrl!: string;

    @IsString()
    @MaxLength(20)
        customUrl!: string;
}