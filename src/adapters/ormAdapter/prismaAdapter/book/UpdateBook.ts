import { prisma,  BookUpdateInput, PrismaErrorClient } from "../db";
import { Book } from "../../../../entities/Book";
import { IUpdateBook } from "../../repositories/book/IUpdateBook";

export class UpdateBook implements IUpdateBook {
  async execute({ props }: Book){

    const { id, title, synopsis, price, genre, author, publishedDate, pageCount, image } = props

    try {
      
      let newData: BookUpdateInput = {
        title: title || undefined,
        synopsis: synopsis || undefined,
        price: price || undefined,
        publishedDate: publishedDate || undefined,
        pageCount: pageCount || undefined,
        image: image || undefined,
      }

      if (genre) {

        newData = {
          title: title || undefined,
          synopsis: synopsis || undefined,
          price: price || undefined,
          publishedDate: publishedDate || undefined,
          pageCount: pageCount || undefined,
          image: image || undefined,
          tag: {
            set:[],
            connectOrCreate: {
              where: {
                genre: genre
              },
              create: {
                genre: genre
              }
            }
          }
        }
      }

      const book = await prisma.book.update({
        where: {
          id: id,
        },
        data: newData,
        include: {
          author: true,
          tag: true
        }
      });

      return new Book({
        id: book.id,
        title: book.title,
        author: book.author[0].name,
        price: book.price,
        synopsis: book.synopsis,
        publishedDate: book.publishedDate,
        pageCount: book.pageCount,
        genre: book.tag[0].genre,
      });


    } catch (error) {
      if (error instanceof PrismaErrorClient) {
        const message =`Invalid input type` 
        
        return message 
      }
       else {
        console.log( "Erro no update book" + error)
       
        return ("Internal server error");
       }
    }
  }
}
