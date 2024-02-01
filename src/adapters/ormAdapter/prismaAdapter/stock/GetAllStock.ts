import { IGetAllStock } from "../../repositories/stock/IGetAllStock";
import { prisma } from "../db";

export class GetAllStock implements IGetAllStock {
  async execute() {
    const BooksStock = await prisma.book.findMany({
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
    let stock = [];
    for (let bookProp of BooksStock) {

      if (typeof bookProp.stock?.id != "string") continue;
      if (typeof bookProp.stock?.quantity != "number") continue;

      let SingularBookStock = {
        id: bookProp.stock.id,
        quantity: bookProp.stock.quantity,
        book: {
          id: bookProp.id,
          title: bookProp.title,
          author: bookProp.author[0].name,
          price: bookProp.price,
          synopsis: bookProp.synopsis,
          genre: bookProp.tag[0].genre,
        },
      };

      stock.push(SingularBookStock);
    }

    return stock;
  }
}
