import { Stock } from "../../../../entities/Stock.js";
import { IGetStockByQuantity } from "../../repositories/stock/IGetStockByQuantity.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class GetStockByQuantity implements IGetStockByQuantity {
  async execute(quantity: number) {
    try {
      const BooksStock = await prisma.stock.findMany({
        where: {
          
          quantity: {
            lte: quantity
          },
        },
        select: {
          id: true,
          quantity: true,
          book: {
            include: {
              author: true,
              tag: true
            }
          }
        }
      });
      if(BooksStock.length == 0){
        return "No books found with this quantity."
      }
      
      let stock = [];
      for (let bookProp of BooksStock) {
  
        stock.push(new Stock({
          id: bookProp.id,
          quantity: bookProp.quantity,
          book: {
            id: bookProp.id,
            title: bookProp.book.title,
            author: bookProp.book.author[0].name,
            price: bookProp.book.price,
            synopsis: bookProp.book.synopsis,
            publishedDate: bookProp.book.publishedDate,
            pageCount: bookProp.book.pageCount,
            genre: bookProp.book.tag[0].genre,
          },
        }));
      }
  
      return stock;
      
    } catch (error) {
      return handlePrismaError("adminError", error)
    }

  }
}