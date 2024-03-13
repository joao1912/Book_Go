import { Book } from "../../../../entities/Book.js";
import { IGetAllBooks } from "../../repositories/book/IGetAllBooks.js";
import { prisma } from "../db.js";

export class GetAllBooks implements IGetAllBooks {
  async execute() {
    try {
      const bookSearch = await prisma.book.findMany({
        include: {
          author: true,
          tag: true
        }
      });

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
        }));
      ;
      }

      return books;
    } catch (error) {
      
       throw new Error("Internal server error: " + error);
    }
  }
}
