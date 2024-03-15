import { IDeleteAllAuthors } from "../../repositories/author/IDeleteAllAuthors.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class DeleteAllAuthors implements IDeleteAllAuthors {

    async execute(): Promise<void> {
        
        try {

            await prisma.author.deleteMany()
            
        } catch (error) {
            
            return handlePrismaError("AuthorError", error)

        }

    }
}