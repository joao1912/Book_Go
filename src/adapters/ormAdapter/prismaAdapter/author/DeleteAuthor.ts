import { IDeleteAuthor, IDeleteMessage } from "../../repositories/author/IDeleteAuthor";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";


export class DeleteAuthor implements IDeleteAuthor {

    async execute(id: string): Promise<IDeleteMessage | void> {
        
        try {

            await prisma.author.delete({
                where: {
                    id: id
                }
            })

            return {
                message: 'Author deletado com sucesso!'
            }
            
        } catch (error) {
            
            return handlePrismaError("AuthorError", error)

        }

    }
}