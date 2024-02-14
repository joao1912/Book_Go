import { Stock } from "../../../../entities/Stock";
import { IGetStockByQuantity } from "../../repositories/stock/IGetStockByQuantity";
import { prisma } from "../db";

export class GetStockByQuantity implements IGetStockByQuantity {
  async execute(quantity: number) {
    
    const BooksStock = await prisma.stock.findMany({
      where: {
        quantity: quantity,
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
  }
}