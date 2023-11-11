import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity } from "typeorm";
import User from "./User";

@Entity()
export default class ShortUrl {
    @PrimaryGeneratedColumn()
        id!: number;

    @Column("text")
        originalUrl!: string;
    
    @Column("text")
        shortUrl!: string;

    @Column("int")
        clicksQuantity!: number;

    @ManyToOne(() => User, (user) => user.shortUrls)
        user?: User;
}