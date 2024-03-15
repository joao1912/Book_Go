import { prisma } from "../db.js";
import { IDeleteComment, IDeleteMessage } from "../../repositories/comment/IDeleteComment.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class DeleteComment implements IDeleteComment {

    async execute(id: string): Promise<IDeleteMessage | void> {
       
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
            
            return handlePrismaError("CommentError", error)

        }
    }
}