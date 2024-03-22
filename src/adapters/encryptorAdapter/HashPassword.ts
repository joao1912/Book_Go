import { hashSync, genSaltSync, compare } from "bcrypt";
import { IEncryptorAdapterRepository } from "./repository/IEncryptorAdapterRepository";
import ServerResponse from "../../interface/controllers/utils/ServerResponse";

export class HashPassword implements IEncryptorAdapterRepository {

    public hash(password: string): string {

        const saltRounds = Number(process.env.SALT_HASH)
        const salt = genSaltSync(saltRounds)

        const passwordHash = hashSync(password, salt)

        return passwordHash

    }

    public async validatePassword(password: string, hash: string): Promise<boolean> {

        if (!password) {

            ServerResponse.badRequest('UserError', 'Invalid password.')

        }

        return await compare(password, hash)

    }

}