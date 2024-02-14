import { hashSync, genSaltSync, compare } from "bcrypt";

export class HashPassword {

    public static hash(password: string): string {

        const saltRounds = Number(process.env.SALT_HASH)
        const salt = genSaltSync(saltRounds)

        const passwordHash = hashSync(password, salt)

        return passwordHash

    }

    public static async validadePassword(password: string, hash: string): Promise<boolean> {

        return await compare(password, hash)

    }

}