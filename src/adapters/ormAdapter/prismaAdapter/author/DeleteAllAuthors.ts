import { IDeleteAllAuthors } from "../../repositories/author/IDeleteAllAuthors.js";
import { prisma } from "../db.js";

export class DeleteAllAuthors implements IDeleteAllAuthors {

    async execute(): Promise<void> {
        
        try {

            await prisma.author.deleteMany()
            
        } catch (error) {
            
            throw new Error('Internal server error' + error)

        }

    }
}