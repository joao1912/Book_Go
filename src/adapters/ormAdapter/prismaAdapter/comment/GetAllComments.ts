import { prisma } from "../db";
import { Comment } from "../../../../entities/Comment";
import { IGetAllComments } from "../../repositories/comment/IGetAllComments";

export class GetAllComments implements IGetAllComments {

    async execute(bookId: string): Promise<Comment[]> {
        
        try {
            
            const comments = await prisma.comment.findMany({
                where: {
                    fk_id_book: bookId
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

            throw new Error('Internal server error: ' + error)
            
        }
    }
}