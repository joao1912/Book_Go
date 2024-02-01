import { Book } from "../../../../entities/Book";
import { ICreateFavorite } from "../../repositories/favorite/ICreateFavorite";
import { prisma } from "../db";

export class CreateFavorite implements ICreateFavorite {
  async execute(userId: string, bookId: string): Promise<Book> {
    try {
      const favorited = await prisma.favorite.create({
        data: {
          fk_id_book: bookId,
          fk_id_user: userId,
        },
        select: {
          book: {
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
          },
        },
      });

      if (favorited.book.author == null)
        throw new Error("Bad Request: Author is null");
      if (favorited.book.tag == null)
        throw new Error("Bad Request: Genre is null");
      if (typeof favorited.book.tag != "string") {
        throw new Error("Internal server error: Genre must be a string type");
      }
      if (typeof favorited.book.author != "string") {
        throw new Error("Internal server error: Author must be a string type");
      }

      return new Book({
        id: favorited.book.id,
        title: favorited.book.title,
        synopsis: favorited.book.synopsis,
        author: favorited.book.author,
        genre: favorited.book.tag,
        price: favorited.book.price,
      });
    } catch (error) {
      throw new Error("Internal server error" + error);
    }
  }
}
