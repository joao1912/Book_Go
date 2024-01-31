import { ISearchBookByGenre } from "../../repositories/book/ISearchBookByGenre";
import { prisma } from "../db";

export class SearchBookByGenre implements ISearchBookByGenre {
  async execute(genre: string) {
    try {
      const bookSearch = await prisma.book.findMany({
        where: {
          books_tags: {
            tag: {
              genre: genre,
            },
          },
        },
        select: {
          id: true,
          title: true,
          synopsis: true,
          price: true,
          books_authors: {
            select: {
              author: true
            }
          },
          books_tags: {
            select: {
              tag: {
                select: {
                  genre: true,
                },
              },
            },
          },
        },
      });
      let books = [];
      for (let bookProp of bookSearch) {
        if (typeof bookProp.books_tags?.tag.genre != "string") continue;
        if (typeof bookProp.books_authors?.author != "string") continue;

        let book = {
          id: bookProp.id,
          title: bookProp.title,
          author: bookProp.books_authors?.author,
          price: bookProp.price,
          synopsis: bookProp.synopsis,
          genre: bookProp.books_tags?.tag.genre,
        };
        books.push(book);
      }

      return books;
    } catch (error) {
      
       throw new Error("Internal server error: " + error);
    }
  }
}
