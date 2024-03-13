import { Book } from "../../../../entities/Book.js";
import { ISearchBookByGenre } from "../../repositories/book/ISearchBookByGenre.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class SearchBookByGenre implements ISearchBookByGenre {
  async execute(genre: string) {
    try {
      const bookSearch = await prisma.book.findMany({
        where: { 
            tag:{
              some: {genre: genre}
            }
          
        },
        include: {
          author: true,
          tag: true
        }
      });
      if(bookSearch.length !== 0){
      let books = [];
      for (let bookProp of bookSearch) {

        books.push(new Book({
          id: bookProp.id,
          title: bookProp.title,
          author: bookProp.author[0].name,
          price: bookProp.price,
          synopsis: bookProp.synopsis,
          publishedDate: bookProp.publishedDate,
          pageCount: bookProp.pageCount,
          genre: bookProp.tag[0].genre,
        }));
  
      }

      return books
    }

      const message = `Genre not found.`
      return message
    } catch (error) {
      return handlePrismaError(error)
     
    }
  }
}
