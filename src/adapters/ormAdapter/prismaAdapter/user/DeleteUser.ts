import { IDeleteMessage, IDeleteUser } from "../../repositories/user/IDeleteUser";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";

export class DeleteUser implements IDeleteUser {
    //@ts-ignore
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
            handlePrismaError("UserError", error)
        }

    }
}