import { prisma } from "../db";
import { IUpdateStock } from "../../repositories/stock/IUpdateStock";
import { IStock } from "../../../../entities/Stock";

export class UpdateStock implements IUpdateStock {
  async execute({id, quantity, book  }: Partial<IStock>): Promise<Partial<IStock>> {
    try {
      const stockData = await prisma.book.update({
        where: {
          id: book?.id,
        },

        data: {
          stock: {
            update: {
              quantity: quantity 
            }
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
  
          stock: {
            select: {
              id: true,
              quantity: true,
            },
          },
        },
      });


      let stock = ({
        id: stockData.stock?.id,
        quantity: stockData.stock?.quantity,
        book: {
          id: stockData.id,
          title: stockData.title,
          author: stockData.author[0].name,
          price: stockData.price,
          synopsis: stockData.synopsis,
          genre: stockData.tag[0].genre,
      }
    });

    return stock

    } catch (error) {
      throw new Error("Something happened: " + error);
    }
  }
}
