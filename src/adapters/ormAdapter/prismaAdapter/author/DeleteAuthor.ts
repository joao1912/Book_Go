import { IDeleteAuthor, IDeleteMessage } from "../../repositories/author/IDeleteAuthor.js";
import { prisma } from "../db.js";


export class DeleteAuthor implements IDeleteAuthor {

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
            
            throw new Error('Internal server error' + error)

        }

    }
}