import { IDeleteUser } from "../../repositories/user/IDeleteUser";
import { prisma } from "../../../../../prisma/db";

export class DeleteUser implements IDeleteUser {

    async execute(id: string): Promise<void> {
        
        try {
            await prisma.user.delete({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Internal server error: ' + error)
        }

    }
}