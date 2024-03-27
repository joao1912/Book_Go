import { Stock } from "../../../../entities/Stock";
import ServerResponse from "../../../../interface/controllers/utils/ServerResponse";
import { IGetStockByBookTitle } from "../../repositories/stock/IGetStockByBookTitle";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";

export class GetStockByBookTitle implements IGetStockByBookTitle {
  //@ts-ignore
  async execute(title: string): Promise<Stock[]> {
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
     
      if (BooksStock.length !== 0) {

      let stock: Stock[] = [];
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
    }
      ServerResponse.notFound('BookError', 'No results.')


    } catch (error) {
      handlePrismaError("StockError", error)
    }

  }
}     