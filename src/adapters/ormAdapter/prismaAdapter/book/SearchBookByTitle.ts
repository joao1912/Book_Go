import { prisma } from "../db";
import { ISearchBookByTitle } from "../../repositories/book/ISearchBookByTitle";
import { Book } from "../../../../entities/Book";
import handlePrismaError from "../util/handlePrismaError";

export class SearchBookByTitle implements ISearchBookByTitle {
  async execute(title: string): Promise<Book[]> {
    try {
      const bookSearch = await prisma.book.findMany({
        where: { title: title },

        include: {
          author: true,
          tag: true
        }
      });
      if (bookSearch.length !== 0) {

        let books: Book[] = [];

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

    } catch (error) {
      handlePrismaError("BookError", error)
      throw error
    }
  }
}
