import { Comment } from "../../../../entities/Comment.js";
import { IGetAllCommentsByUserId } from "../../repositories/comment/IGetAllCommentsByUserId.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";



export class GetAllCommentsByUserId implements IGetAllCommentsByUserId {

    async execute(userId: string): Promise<Comment[] | void> {

        try {
            
            const comments = await prisma.comment.findMany({
                where: {
                    fk_id_user: userId
                }
            })

            let AllCommentsInstances: Comment[] = []

            for(let comment of comments) {

                const commentInstance = new Comment({
                    id: comment.id,
                    bookId: comment.fk_id_book,
                    userId: comment.fk_id_user,
                    comment: comment.comment
                })

                AllCommentsInstances.push(commentInstance)

            }

            return AllCommentsInstances

        } catch (error) {

            return handlePrismaError("CommentError", error)
            
        }

    }

}