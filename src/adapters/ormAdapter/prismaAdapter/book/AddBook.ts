import { prisma } from "../db";
import { Book } from "../../../../entities/Book";
import { IAddBook } from "../../repositories/book/IAddBook";
import handlePrismaError from "../util/handlePrismaError";
import { string } from "zod";


export class AddBook implements IAddBook {
  //@ts-ignore
  async execute({ props }: Book): Promise<Book> {

    const { title, price, genre, synopsis, author, publishedDate, pageCount, image } = props
    
    const arrayGenre = genre.split(",")
    const arrayAuthor = author.split(",")

    try {
      const book = await prisma.book.create({
        data: {
          title: title,
          price: price,
          synopsis: synopsis,
          publishedDate: publishedDate,
          pageCount: pageCount,
          image: image,
          author: {
            connectOrCreate: arrayAuthor.map(author => ({
              where: { name: author },
              create: { name: author },
            })),
          },
          tag: {
            connectOrCreate: arrayGenre.map(genre => ({
              where: {
                genre: genre,
              },
              create: {
                genre: genre,
              },
            })),
          },
          stock: {
            create: {
              quantity: 1
            }
          }
        },
        include: {
          author: true,
          tag: true
        }
      });


      return new Book({
        id: book.id,
        title: book.title,
        price: book.price,
        author: book.author[0].name,
        publishedDate: book.publishedDate,
        pageCount: book.pageCount,
        synopsis: book.synopsis,
        genre: book.tag[0].genre,
      });

    } catch (error) {
      handlePrismaError("BookError", error)
      
    }
  }
}
