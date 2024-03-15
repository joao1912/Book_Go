import { prisma } from "../db.js";
import { IDeleteAllComments } from "../../repositories/comment/IDeleteAllComments.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class DeleteAllComments implements IDeleteAllComments {

    async execute(): Promise<void> {

        try {

            await prisma.comment.deleteMany()
            
        } catch (error) {
           
            return handlePrismaError("CommentError", error)

        }

    }
    
}