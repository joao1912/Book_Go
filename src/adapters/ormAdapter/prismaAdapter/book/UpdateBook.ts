import { prisma, PrismaError } from "../db";
import { Book, IBook } from "../../../../entities/Book";
import { IUpdateBook } from "../../repositories/book/IUpdateBook";

export class UpdateBook implements IUpdateBook {
  async execute({ props }: Book): Promise<Book> {

    const {id, title, synopsis, price, genre, author} = props
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
            connectOrCreate: {
              where: {
                genre: genre
              },
              create: {
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

      const tagDisconnect = await prisma.tag.update({
        where: {
          genre: "Biography"
        },
        data: {
          book: {
           disconnect: {
            id: id
          }
          }
          }
        

      })

      
  

      return new Book({
        id: book.id,
        title: book.title,
        author: book.author[0].name,
        price: book.price,
        synopsis: book.synopsis,
        genre: book.tag[0].genre,
      });

      
    } catch (error) {
      if(error instanceof PrismaError){
        console.log("Prisma errinho", error.code)
      }
      throw new Error("Something else happened: " + error);
    }
  }
}
