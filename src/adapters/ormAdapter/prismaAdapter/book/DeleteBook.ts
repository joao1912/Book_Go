import { IDeleteBook, IDeleteMessageBook } from "../../repositories/book/IDeleteBook.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class DeleteBook implements IDeleteBook {

    async execute(id: string): Promise<IDeleteMessageBook> {

        try {
            const bookDeleted = await prisma.book.delete({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    title: true
                }
            })

            return {
                message: `The book with ID ${bookDeleted.id} and title "${bookDeleted.title}" has been successfully deleted.`
            }

        } catch (error) {
            const message = handlePrismaError(error)
            return {message: message}      
                
            }
    }
}