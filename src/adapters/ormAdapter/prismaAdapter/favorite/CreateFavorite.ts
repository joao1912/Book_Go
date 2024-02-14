import { Book } from "../../../../entities/Book";
import { ICreateFavorite, IFavoriteCreated } from "../../repositories/favorite/ICreateFavorite";
import { prisma } from "../db";

export class CreateFavorite implements ICreateFavorite {
  async execute(userId: string, bookId: string): Promise<IFavoriteCreated> {
    try {
      const favorited = await prisma.favorite.create({
        data: {

          fk_id_book: bookId,
          fk_id_user: userId,
        },
        select: {
          id: true,
          book: {
            select: {
              id: true,
              title: true,
              synopsis: true,
              publishedDate: true,
              pageCount: true,
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

      return {
        favoriteId: favorited.id,
        book: new Book({
          id: favorited.book.id,
          title: favorited.book.title,
          synopsis: favorited.book.synopsis,
          author: favorited.book.author[0].name,
          publishedDate: favorited.book.publishedDate,
          pageCount: favorited.book.pageCount,
          genre: favorited.book.tag[0].genre,
          price: favorited.book.price,
        })
      }
    } catch (error) {
      console.log("Erro" + error)
      throw new Error("Internal server error" + error);
    }
  }
}
