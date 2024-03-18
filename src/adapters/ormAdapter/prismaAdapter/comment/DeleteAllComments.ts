import { prisma } from "../db";
import { IDeleteAllComments } from "../../repositories/comment/IDeleteAllComments";
import handlePrismaError from "../util/handlePrismaError";

export class DeleteAllComments implements IDeleteAllComments {
    //@ts-ignore
    async execute(): Promise<void> {

        try {

            await prisma.comment.deleteMany()
            
        } catch (error) {
           
            handlePrismaError("CommentError", error)
            
        }

    }
    
}