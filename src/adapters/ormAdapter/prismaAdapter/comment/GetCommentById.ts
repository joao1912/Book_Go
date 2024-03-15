import { prisma } from "../db.js";
import { Comment } from "../../../../entities/Comment.js";
import { IGetCommentById } from "../../repositories/comment/IGetCommentById.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class GetCommentById implements IGetCommentById {

    async execute(id: string): Promise<Comment | void> {

        try {

            const comment = await prisma.comment.findUnique({
                where: {
                    id: id
                }
            })

            if (comment == null) {
                return
            }

            const commentInstance = new Comment({
                id: comment.id,
                bookId: comment.fk_id_book,
                userId: comment.fk_id_user,
                comment: comment.comment
            })

            return commentInstance
            
        } catch (error) {

            return handlePrismaError("CommentError", error)
            
        }
    }
}