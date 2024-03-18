import { IDeleteAllAuthors } from "../../repositories/author/IDeleteAllAuthors";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";

export class DeleteAllAuthors implements IDeleteAllAuthors {

    async execute(): Promise<void> {
        //@ts-ignore
        try {

            await prisma.author.deleteMany()
            
        } catch (error) {
            
            handlePrismaError("AuthorError", error)
          
        }

    }
}