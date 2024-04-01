import { prisma } from "../db";
import { Book } from "../../../../entities/Book";
import { IAddBook } from "../../repositories/book/IAddBook";
import handlePrismaError from "../util/handlePrismaError";
import { string } from "zod";


export class AddBook implements IAddBook {
  //@ts-ignore
  async execute({ props }: Book): Promise<Book> {

    const { title, price, genre, synopsis, author, publishedDate, pageCount, image } = props
  
    const parseAuthor = JSON.parse(author)
    const parseGenre = JSON.parse(genre)

    const authorConnectOrCreate = parseAuthor.map((authors: string)  => ({
      connectOrCreate: {
        where: { name: authors },
        create: { name: authors },
      },
    }));
    const genreConnectOrCreate = parseGenre.map((genres: string)  => ({
      connectOrCreate: {
        where: { name: genres },
        create: { name: genres },
      },
    }));
   
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
            create: authorConnectOrCreate,
          },
          tag: {
            create: authorConnectOrCreate,
          },
          // tag: {
          //   connectOrCreate: {
          //     where: {
          //       genre: genre,
          //     },
          //     create: {
          //       genre: genre,
          //     },
          //   },
          // },
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
