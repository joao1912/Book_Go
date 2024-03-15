import { prisma } from "../db.js";
import { Book } from "../../../../entities/Book.js";
import { ISearchBookById } from "../../repositories/book/ISearchBookById.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class SearchBookById implements ISearchBookById {
  async execute(id: string) {
    try {
      console.log("Id", id)
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

      let message = "There is no book with the id provided "
      return message

    } catch (error) {
      return handlePrismaError("adminError", error)
    }
  }
}

