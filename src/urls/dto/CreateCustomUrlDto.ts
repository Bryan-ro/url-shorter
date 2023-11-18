import { IsOptional, IsString, IsUrl, Length } from "class-validator";

export class CreateCustomUrlDto {
    @IsUrl()
        originalUrl!: string;

    @IsString()
    @Length(5, 30)
        customUrl!: string;
}