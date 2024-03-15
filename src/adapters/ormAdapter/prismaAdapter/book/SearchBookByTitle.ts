import { prisma } from "../db.js";
import { ISearchBookByTitle } from "../../repositories/book/ISearchBookByTitle.js";
import { Book } from "../../../../entities/Book.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class SearchBookByTitle implements ISearchBookByTitle {
  async execute(title: string) {
    try {
      const bookSearch = await prisma.book.findMany({
        where: { title: title },

        include: {
          author: true,
          tag: true
        }
      });
      if (bookSearch.length !== 0) {

        let books = [];

        for (let bookProp of bookSearch) {
          books.push(new Book({
            id: bookProp.id,
            title: bookProp.title,
            author: bookProp.author[0].name,
            price: bookProp.price,
            synopsis: bookProp.synopsis,
            publishedDate: bookProp.publishedDate,
            pageCount: bookProp.pageCount,
            genre: bookProp.tag[0].genre,
          })
          );
        }
        return books
      }

      const message = `No results.`

      return message



    } catch (error) {
      return handlePrismaError("userError", error)
    }
  }
}
