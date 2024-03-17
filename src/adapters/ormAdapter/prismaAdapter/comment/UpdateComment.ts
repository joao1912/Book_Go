import { prisma } from "../db";
import { IComment, Comment } from "../../../../entities/Comment";
import { IUpdateComment } from "../../repositories/comment/IUpdateComment";
import handlePrismaError from "../util/handlePrismaError";

export class UpdateComment implements IUpdateComment {

    async execute({props}: Comment): Promise<Comment> {

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

            handlePrismaError("CommentError", error)

        }
    }
}