import { prisma } from "../../../../../prisma/db";
import { IComment, Comment } from "../../../../entities/Comment";
import { IUpdateComment } from "../../repositories/comment/IUpdateComment";

export class UpdateComment implements IUpdateComment {

    async execute(commentUpdated: Partial<IComment>): Promise<Partial<Comment>> {

        try {

            const comment = await prisma.comment.update({
                where: {
                    id: commentUpdated.id
                },

                data: {
                    comment: commentUpdated.comment || undefined
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

            throw new Error("Something happened: " + error)

        }
    }
}