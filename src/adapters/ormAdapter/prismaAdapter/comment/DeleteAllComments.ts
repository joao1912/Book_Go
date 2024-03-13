import { prisma } from "../db.js";
import { IDeleteAllComments } from "../../repositories/comment/IDeleteAllComments.js";

export class DeleteAllComments implements IDeleteAllComments {

    async execute(): Promise<void> {

        try {

            await prisma.comment.deleteMany()
            
        } catch (error) {
           
            throw new Error('Internal server error: ' + error)

        }

    }
    
}