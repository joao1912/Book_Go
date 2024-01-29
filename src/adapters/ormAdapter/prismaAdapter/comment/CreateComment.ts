import { IComment, Comment } from "../../../../entities/Comment";
import { ICreateComment } from "../../repositories/comment/ICreateComment";
import { prisma } from "../../../../../prisma/db";

export class CreateComment implements ICreateComment {

    async execute({comment, bookId, userId}: Omit<IComment, "id">): Promise<Comment> {
        
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

    }
}