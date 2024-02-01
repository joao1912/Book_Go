import { ISearchBookByGenre } from "../../repositories/book/ISearchBookByGenre";
import { prisma } from "../db";

export class SearchBookByGenre implements ISearchBookByGenre {
  async execute(genre: string) {
    try {
      const bookSearch = await prisma.book.findMany({
        where: { 
            tag:{
              some: {genre: genre}
            }
          
        },
        select: {
          id: true,
          title: true,
          synopsis: true,
          price: true,
          author: {
            select: {
              name: true
            }
          },
          tag: {
            select: {
              genre: true
            }
          }
         
        },
      });
      let books = [];
      for (let bookProp of bookSearch) {

        let book = {
          id: bookProp.id,
          title: bookProp.title,
          author: bookProp.author[0].name,
          price: bookProp.price,
          synopsis: bookProp.synopsis,
          genre: bookProp.tag[0].genre,
        };
        books.push(book);
      }

      return books;
    } catch (error) {
      
       throw new Error("Internal server error: " + error);
    }
  }
}
