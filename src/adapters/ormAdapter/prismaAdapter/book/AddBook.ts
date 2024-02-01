import { prisma } from "../db";
import { IBook, Book } from "../../../../entities/Book";
import { IAddBook } from "../../repositories/book/IAddBook";

export class AddBook implements IAddBook {
  async execute({
    title,
    price,
    genre,
    synopsis,
    author,
  }: Omit<IBook, "id">): Promise<Book> {
    try {
      const book = await prisma.book.create({
        data: {
          title: title,
          price: price,
          synopsis: synopsis,
          author: {
            connectOrCreate: {
              where: {
                name: author,
              },
              create: {
                name: author,
              },
            },
          },
          tag: {
            connectOrCreate: {
              where: {
                genre: genre,
              },
              create: {
                genre: genre,
              },
            },
          },
        },
        select: {
          id: true,
          title: true,
          synopsis: true,
          price: true,
          author: {
            select: {
              name: true,
            },
          },
          tag: {
            select: {
              genre: true,
            },
          },
        },
      });
      if (typeof book.tag != "string") {
        throw new Error("Internal server error: Genre must be a string type");
      }
      if (typeof book.author != "string") {
        throw new Error("Internal server error: Author must be a string type");
      }

      return new Book({
        id: book.id,
        title: book.title,
        price: book.price,
        author: book.author,
        synopsis: book.synopsis,
        genre: book.tag,
      });
    } catch (error) {
      throw new Error("Internal server error: " + error);
    }
  }
}
