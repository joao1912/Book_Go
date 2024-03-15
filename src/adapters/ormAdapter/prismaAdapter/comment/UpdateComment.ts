import { prisma } from "../db.js";
import { IComment, Comment } from "../../../../entities/Comment.js";
import { IUpdateComment } from "../../repositories/comment/IUpdateComment.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class UpdateComment implements IUpdateComment {

    async execute({props}: Comment): Promise<Comment | void> {

        try {

            const comment = await prisma.comment.update({
                where: {
                    id: props?.id
                },

                data: {
                    comment: props?.comment || undefined
                }

            })

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