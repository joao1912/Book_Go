import { Stock } from "../../../../entities/Stock.js";
import { IGetStockByBookTitle } from "../../repositories/stock/IGetStockByBookTitle.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class GetStockByBookTitle implements IGetStockByBookTitle {
  async execute(title: string) {
    try {
      const BooksStock = await prisma.stock.findMany({
        where: {
          book: {

            title: title
          }
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
        },
      });

      if(BooksStock.length == 0){
        return "Book not found."
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
      return handlePrismaError(error)
    }

  }
}     