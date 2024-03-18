import { Book } from "../../../../entities/Book";
import { IGetAllBooks } from "../../repositories/book/IGetAllBooks";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";

export class GetAllBooks implements IGetAllBooks {
  //@ts-ignore
  async execute(): Promise<Book[]> {
    try {
      const bookSearch = await prisma.book.findMany({
        include: {
          author: true,
          tag: true
        }
      });

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
      ;
      }

      return books;

    } catch (error) {

      handlePrismaError("BookError",error)
      
    }
  }
}
