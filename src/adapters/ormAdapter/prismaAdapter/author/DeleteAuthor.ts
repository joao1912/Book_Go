import { IDeleteAuthor, IDeleteMessage } from "../../repositories/author/IDeleteAuthor";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";


export class DeleteAuthor implements IDeleteAuthor {
    //@ts-ignore
    async execute(id: string): Promise<IDeleteMessage> {
        
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
            
            handlePrismaError("AuthorError", error)
        }

    }
}