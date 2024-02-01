import { prisma } from "../db";
import { Book, IBook } from "../../../../entities/Book";
import { IUpdateBook } from "../../repositories/book/IUpdateBook";

export class UpdateBook implements IUpdateBook {
  async execute({
    id,
    title,
    synopsis,
    price,
    genre,
    author,
  }: Partial<IBook>): Promise<Book> {
    try {
      const book = await prisma.book.update({
        where: {
          id: id,
        },

        data: {
          title: title || undefined,
          synopsis: synopsis || undefined,
          price: price || undefined,  
          tag: {
            update: {
              where: { 
                genre: undefined
              },
              data: {
                genre: genre
              }
            }
          }
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
      if (typeof book.tag!= "string") {
        throw new Error("Internal server error: Genre must be a string type");
      }
      if (typeof book.author != "string") {
        throw new Error("Internal server error: Author must be a string type");
      }

      return new Book({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        synopsis: book.synopsis,
        genre: book.tag,
      });

      
    } catch (error) {
      throw new Error("Something happened: " + error);
    }
  }
}
