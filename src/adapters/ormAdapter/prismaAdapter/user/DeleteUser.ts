import { IDeleteMessage, IDeleteUser } from "../../repositories/user/IDeleteUser.js";
import { prisma } from "../db.js";

export class DeleteUser implements IDeleteUser {

    async execute(id: string): Promise<IDeleteMessage> {

        try {
            await prisma.user.delete({
                where: {
                    id: id
                }
            })

            return {
                message: `O usuário de id: ${id} foi excluído com sucesso.`
            }

        } catch (error) {
            throw new Error('Internal server error: ' + error)
        }

    }
}