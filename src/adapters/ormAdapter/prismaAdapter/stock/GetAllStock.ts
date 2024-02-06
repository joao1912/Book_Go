import { Stock } from "../../../../entities/Stock";
import { IGetAllStock } from "../../repositories/stock/IGetAllStock";
import { prisma } from "../db";

export class GetAllStock implements IGetAllStock {
  async execute() {
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
          genre: bookProp.book.tag[0].genre,
        },
      }));

 
    }

    return stock;
  }
}
