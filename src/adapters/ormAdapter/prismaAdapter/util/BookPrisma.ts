import { prisma } from "../db";
import { Book } from "../../../../entities/Book";
import { IAddBook } from "../../repositories/book/IAddBook";
import handlePrismaError from "../util/handlePrismaError";
import { IBookReposity } from "../../repositories/book/IBook";
import { PrismaClient } from "@prisma/client"




export class BookPrisma implements IBookReposity {
    constructor(private readonly prismaBook: PrismaClient['book']) { }

    // const { title, price, genre, synopsis, author, publishedDate, pageCount, image } = props
    async IGetAllBooks() {
        const result = this.prismaBook.findMany({
            include: {
                author: true,
                tag: true
            },
        })
    }

    async ISearchBookById(id: string) {
        const result = this.prismaBook.findUnique({
            where: { id: id },
            include: {
                author: true,
                tag: true
            },
        })
    }
    async ISearchBookByGenre(genre: string) {
        const result = this.prismaBook.findMany({
            where: {
                tag: {
                    some: { genre: genre }
                }
            },
            include: {
                author: true,
                tag: true
            },
        })
    }
    async ISearchBookByTitle(title: string) {
        const result = this.prismaBook.findMany({
            where: {
                title: title
            },
            include: {
                author: true,
                tag: true
            },
        })
    }


    // try {

    //     //     data: {
    //     //       title: title,
    //     //       price: price,
    //     //       synopsis: synopsis,
    //     //       publishedDate: publishedDate,
    //     //       pageCount: pageCount,
    //     //       image: image,
    //     //       author: {
    //     //         connectOrCreate: {
    //     //           where: {
    //     //             name: author,
    //     //           },
    //     //           create: {
    //     //             name: author,
    //     //           },
    //     //         },
    //     //       },
    //     //       tag: {
    //     //         connectOrCreate: {
    //     //           where: {
    //     //             genre: genre,
    //     //           },
    //     //           create: {
    //     //             genre: genre,
    //     //           },
    //     //         },
    //     //       },
    //     //       stock: {
    //     //         create: {
    //     //           quantity: 1
    //     //         }
    //     //       }
    //     //     },
    //     //     include: {
    //     //       author: true,
    //     //       tag: true
    //     //     }
    //     //   });


    //     //   return new Book({
    //     //     id: book.id,
    //     //     title: book.title,
    //     //     price: book.price,
    //     //     author: book.author[0].name,
    //     //     publishedDate: book.publishedDate,
    //     //     pageCount: book.pageCount,
    //     //     synopsis: book.synopsis,
    //     //     genre: book.tag[0].genre,
    //     //   });

    // } catch (error) {
    //     return handlePrismaError("adminError", error)

    // }
}