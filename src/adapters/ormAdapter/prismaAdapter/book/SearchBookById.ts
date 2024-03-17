import { prisma } from "../db";
import { Book } from "../../../../entities/Book";
import { ISearchBookById } from "../../repositories/book/ISearchBookById";
import handlePrismaError from "../util/handlePrismaError";

export class SearchBookById implements ISearchBookById {
  
  async execute(id: string): Promise<Book> {
    try {
     
      const bookProp = await prisma.book.findUnique({
        where: { id: id },

        include: {
          author: true,
          tag: true
        }
      });

      if (bookProp != null) {
        return new Book({
          id: bookProp.id,
          title: bookProp.title,
          author: bookProp.author[0].name,
          price: bookProp.price,
          synopsis: bookProp.synopsis,
          publishedDate: bookProp.publishedDate,
          pageCount: bookProp.pageCount,
          genre: bookProp.tag[0].genre,
        })
      }

    } catch (error) {

      handlePrismaError("BookError", error)

    }
  }
}

