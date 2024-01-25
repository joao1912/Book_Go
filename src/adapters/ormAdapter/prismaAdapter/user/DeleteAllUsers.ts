import { prisma } from "../../../../../prisma/db";
import { IDeleteAllUsers } from "../../repositories/user/IDeleteAllUsers";

export class DeleteAllUsers implements IDeleteAllUsers {

    async execute(): Promise<void> {
        
        try {
            await prisma.user.deleteMany()

        } catch (error) {
            throw new Error('Internal server error: ' + error)
        }

    }
}