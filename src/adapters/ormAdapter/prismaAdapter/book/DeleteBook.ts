import { IDeleteBook, IDeleteMessageBook } from "../../repositories/book/IDeleteBook";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";

export class DeleteBook implements IDeleteBook {
    //@ts-ignore
    async execute(id: string): Promise<{ message: string }> {

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

            handlePrismaError("BookError", error)
          
        }
    }
}