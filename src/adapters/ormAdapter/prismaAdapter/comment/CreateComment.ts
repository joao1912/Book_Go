import { IComment, Comment } from "../../../../entities/Comment";
import { ICreateComment } from "../../repositories/comment/ICreateComment";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";

export class CreateComment implements ICreateComment {

    async execute({props}: Omit<Comment, "id">): Promise<Comment> {

        const {comment, bookId, userId} = props
        
        try {
        
            const commentData = await prisma.comment.create({
                data: {
                    comment: comment,
                    fk_id_book: bookId,
                    fk_id_user: userId
                }
            })

            const newComment = new Comment({
                id: commentData.id,
                bookId: commentData.fk_id_book,
                userId: commentData.fk_id_user,
                comment: commentData.comment
            })

            return newComment

        } catch (error) {

            handlePrismaError("CommentError", error)
            
        }
    }
}