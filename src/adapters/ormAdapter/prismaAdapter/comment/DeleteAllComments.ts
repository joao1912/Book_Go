import { prisma } from "../../../../../prisma/db";
import { IDeleteAllComments } from "../../repositories/comment/IDeleteAllComments";

export class DeleteAllComments implements IDeleteAllComments {

    async execute(): Promise<void> {

        try {

            await prisma.comment.deleteMany()
            
        } catch (error) {
           
            throw new Error('Internal server error: ' + error)

        }

    }
    
}