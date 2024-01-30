import { prisma } from "../../../../../prisma/db";
import { IBook } from "../../../../entities/Book";
import { IUpdateBook } from "../../repositories/book/IUpdateBook";

export class UpdateBook implements IUpdateBook {

  async execute({id, title, synopsis, price, genre }: Partial<IBook>): Promise<Partial<IBook>> {

    try {

      const book = await prisma.book.update({
        where: {
          id: id
        },

        data: {
          title: title || undefined,
          synopsis: synopsis || undefined,
          price: price || undefined,
          books_tags:{
            update:{
                tag:{
                    update:{
                        genre: genre || undefined
                    }
            }
          }
  
        }
    },
        select: {
          id: true,
          title: true,
          synopsis: true,
          price: true,
          books_tags:{
            select:{
                tag: {
                    select: {
                        genre: true
                    }
                }
            }
        }
        }

      })

      return book

    } catch (error) {

      throw new Error("Something happened: " + error)
      
    }

 
  }
}