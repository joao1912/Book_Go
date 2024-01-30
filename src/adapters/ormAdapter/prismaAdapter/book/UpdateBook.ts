import { prisma } from "../db";
import { IBook } from "../../../../entities/Book";
import { IUpdateBook } from "../../repositories/book/IUpdateBook";

export class UpdateBook implements IUpdateBook {
  async execute({
    id,
    title,
    synopsis,
    price,
    genre,
    author,
  }: Partial<IBook>): Promise<Partial<IBook>> {
    try {
      const book = await prisma.book.update({
        where: {
          id: id,
        },

        data: {
          title: title || undefined,
          synopsis: synopsis || undefined,
          price: price || undefined,
          books_authors: {
            update: {
              author: {
                update: {
                  name: author || undefined,
                },
              },
            },
          },
          books_tags: {
            update: {
              tag: {
                update: {
                  genre: genre || undefined,
                },
              },
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
              author: true,
            },
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
      if (typeof book.books_tags?.tag.genre != "string") {
        throw new Error("Internal server error: Genre must be a string type");
      }
      if (typeof book.books_authors?.author != "string") {
        throw new Error("Internal server error: Author must be a string type");
      }

      let UpdatedBook = {
        id: book.id,
        title: book.title,
        author: book.books_authors?.author || "",
        price: book.price,
        synopsis: book.synopsis,
        genre: book.books_tags?.tag.genre || "",
      };

      return UpdatedBook;
    } catch (error) {
      throw new Error("Something happened: " + error);
    }
  }
}
