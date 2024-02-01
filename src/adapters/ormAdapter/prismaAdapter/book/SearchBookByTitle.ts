import { prisma } from "../db";
import { ISearchBookByTitle } from "../../repositories/book/ISearchBookByTitle";

export class SearchBookByTitle implements ISearchBookByTitle {
  async execute(title: string) {
    try {
      const bookSearch = await prisma.book.findMany({
        where: { title: title },

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
        if (typeof bookProp.tag != "string") continue;
        if (typeof bookProp.author != "string") continue;

        let book = {
          id: bookProp.id,
          title: bookProp.title,
          author: bookProp.author,
          price: bookProp.price,
          synopsis: bookProp.synopsis,
          genre: bookProp.tag,
        };
        books.push(book);
      }

      return books;
    } catch (error) {
      throw new Error(`Internal server error: There is no book with the title "${title}" `+ error);
    }
  }
}
