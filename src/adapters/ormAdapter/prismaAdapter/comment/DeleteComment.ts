import { prisma } from "../db.js";
import { IDeleteComment, IDeleteMessage } from "../../repositories/comment/IDeleteComment.js";

export class DeleteComment implements IDeleteComment {

    async execute(id: string): Promise<IDeleteMessage> {
       
        try {
            
            await prisma.comment.delete({
                where: {
                    id: id
                }
            })

            const message: IDeleteMessage =  {
                message: 'Comentário deletado com sucesso!'
            }

            return message

        } catch (error) {
            
            throw new Error('internal server error' + error)

        }
    }
}