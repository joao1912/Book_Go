import { Book } from "../../../../entities/Book";
import { IGetAllBooks } from "../../repositories/book/IGetAllBooks";
import { prisma } from "../db";

export class GetAllBooks implements IGetAllBooks {
  async execute() {
    try {
      const bookSearch = await prisma.book.findMany({
        select: {
          id: true,
          title: true,
          synopsis: true,
          price: true,
          author: {
            select: {
              name: true
            }
          },
          tag: {
            select: {
              genre: true
            }
          }
         
        },
      });

      let books = [];
      for (let bookProp of bookSearch) {

        books.push(new Book({
          id: bookProp.id,
          title: bookProp.title,
          author: bookProp.author[0].name,
          price: bookProp.price,
          synopsis: bookProp.synopsis,
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
