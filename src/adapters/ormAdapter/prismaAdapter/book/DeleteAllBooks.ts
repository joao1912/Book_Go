import { IDeleteAllBooks } from "../../repositories/book/IDeleteAllBooks";
import { prisma } from "../db";

export class DeleteBook implements IDeleteAllBooks {

    async execute(): Promise<void> {
        
        try {
           await prisma.book.deleteMany()
           
        } catch (error) {
            throw new Error('Internal server error: ' + error)
        }

    }
}