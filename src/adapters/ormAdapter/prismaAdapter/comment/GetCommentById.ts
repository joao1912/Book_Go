import { prisma } from "../db";
import { Comment } from "../../../../entities/Comment";
import { IGetCommentById } from "../../repositories/comment/IGetCommentById";
import handlePrismaError from "../util/handlePrismaError";
import ServerResponse from "../../../../interface/controllers/utils/ServerResponse";

export class GetCommentById implements IGetCommentById {
    //@ts-ignore
    async execute(id: string): Promise<Comment> {

        try {

            const comment = await prisma.comment.findUnique({
                where: {
                    id: id
                }
            })

            if (!comment) {

                ServerResponse.notFound('CommentError', 'This comment dont exists.')

            }

            const commentInstance = new Comment({
                id: comment!.id,
                bookId: comment!.fk_id_book,
                userId: comment!.fk_id_user,
                comment: comment!.comment
            })

            return commentInstance

        } catch (error) {

            handlePrismaError("CommentError", error)

        }
    }
}