import { IDeleteMessage, IDeleteUser } from "../../repositories/user/IDeleteUser.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class DeleteUser implements IDeleteUser {

    async execute(id: string): Promise<IDeleteMessage | void> {

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
            return handlePrismaError("UserError", error)
        }

    }
}