import { Prisma } from "@prisma/client";
import { IComment, Comment } from "../../../../entities/Comment";
import { ICreateComment } from "../../repositories/comment/ICreateComment";
import { prisma } from "../db";

export class CreateComment implements ICreateComment {

    async execute({comment, bookId, userId}: Omit<IComment, "id">): Promise<Comment> {
        
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