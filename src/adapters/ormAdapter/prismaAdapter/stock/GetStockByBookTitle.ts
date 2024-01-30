import { IGetStockByBookTitle } from "../../repositories/stock/IGetStockByBookTitle";
import { prisma } from "../db";

export class GetStockByBookTitle implements IGetStockByBookTitle{
  async execute (title:string) {
    const BooksStock = await prisma.book.findMany({
        where: { title: title },
        select: {
        id: true,
        title: true,
        synopsis: true,
        price: true,
        books_authors: {
          select: {
            author: true,
          },
        },
        books_tags: {
          select: {
            tag: {
              select: {
                genre: true,
              },
            },
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
      if (typeof bookProp.books_tags?.tag.genre != "string") continue;
      if (typeof bookProp.books_authors?.author != "string") continue;
      if (typeof bookProp.stock?.id != "string") continue;
      if (typeof bookProp.stock?.quantity != "number") continue;

      let SingularBookStock = {
        id: bookProp.stock?.id,
        quantity: bookProp.stock?.quantity,
        book: {
          id: bookProp.id,
          title: bookProp.title,
          author: bookProp.books_authors?.author,
          price: bookProp.price,
          synopsis: bookProp.synopsis,
          genre: bookProp.books_tags?.tag.genre,
        },
      };
      
      stock.push(SingularBookStock);
    }

    return stock;
  }
}
