import { IDeleteAllBooks } from "../../repositories/book/IDeleteAllBooks.js";
import { prisma } from "../db.js";

export class DeleteAllBooks implements IDeleteAllBooks {

    async execute(): Promise<void> {
        
        try {
           await prisma.book.deleteMany()
           
        } catch (error) {
            throw new Error('Internal server error: ' + error)
        }

    }
}