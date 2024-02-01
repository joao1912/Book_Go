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
      if (typeof stockData.tag != "string") {
        throw new Error("Internal server error: Genre must be a string type");
      }
      if (typeof stockData.author != "string") {
        throw new Error("Internal server error: Author must be a string type");
      }

      if (typeof stockData.stock?.id != "string"){
        throw new Error("Internal server error: Id must be a string type");

      } 
      if (typeof stockData.stock?.quantity != "number"){
        throw new Error("Internal server error: Quantity must be a number type");

      }

      let stock = ({
        id: stockData.stock?.id,
        quantity: stockData.stock?.quantity,
        book: {
          id: stockData.id,
          title: stockData.title,
          author: stockData.author,
          price: stockData.price,
          synopsis: stockData.synopsis,
          genre: stockData.tag,
      }
    });

    return stock

    } catch (error) {
      throw new Error("Something happened: " + error);
    }
  }
}
