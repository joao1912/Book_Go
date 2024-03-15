import { IDeleteAllBooks } from "../../repositories/book/IDeleteAllBooks.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class DeleteAllBooks implements IDeleteAllBooks {

    async execute(): Promise<void> {
        
        try {
           await prisma.book.deleteMany()
           
        } catch (error) {
            return  handlePrismaError("adminError", error)
        }

    }
}