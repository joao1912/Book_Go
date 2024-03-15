import { IDeleteMessage, IDeleteUser } from "../../repositories/user/IDeleteUser";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";

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