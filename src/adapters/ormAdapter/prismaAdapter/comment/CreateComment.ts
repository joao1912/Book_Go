import { Prisma } from "@prisma/client";
import { IComment, Comment } from "../../../../entities/Comment.js";
import { ICreateComment } from "../../repositories/comment/ICreateComment.js";
import { prisma } from "../db.js";

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

            if (error instanceof Prisma.PrismaClientKnownRequestError) {

                console.log(error.code)
                console.log(error.meta)
                //tratar o erro aqui

            }

            throw error
            
        }
    }
}