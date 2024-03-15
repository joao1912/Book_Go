import { Stock } from "../../../../entities/Stock.js";
import { IGetAllStock } from "../../repositories/stock/IGetAllStock.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class GetAllStock implements IGetAllStock {
  async execute() {
    try {
      const BooksStock = await prisma.stock.findMany({
        select: {
          id: true,
          quantity: true,
          book: {
            include: {
              author: true,
              tag: true
            }
          }
          },
      });
      let stock = [];
      for (let bookProp of BooksStock) {
  
        stock.push (new Stock ({
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
      return handlePrismaError("stockError", error)
    }

  }
}
