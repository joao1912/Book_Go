import { Book } from "../../../../entities/Book";
import ServerResponse from "../../../../interface/controllers/utils/ServerResponse";
import { ISearchBookByGenre } from "../../repositories/book/ISearchBookByGenre";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";

export class SearchBookByGenre implements ISearchBookByGenre {
  //@ts-ignore
  async execute(genre: string): Promise<Book[]> {
    try {
      const bookSearch = await prisma.book.findMany({
        where: {
          tag: {
            some: { genre: genre }
          }

        },
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
          }));

        }

        return books
      }

      ServerResponse.notFound('BookError', 'The genre of this book was not found.')

    } catch (error) {

      handlePrismaError("BookError", error)
    
    }
  }
}
