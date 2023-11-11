import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import ShortUrl from "./ShortUrl";

@Entity("users")
export default class User {
    @PrimaryGeneratedColumn()
        id!: number;

    @Column("text")
        name!: string;
        
    @Column("text")
       email!: string;

    @Column("text")
        phone!: string;

    @Column("text")
        password!: string;

    @OneToMany(() => ShortUrl, (shortUrl) => shortUrl.user)
        shortUrls!: ShortUrl[]
}