import { IsOptional, IsString, IsUrl, Length } from "class-validator";

export class CreateRandomUrlDto {
    @IsUrl()
        originalUrl!: string;
}