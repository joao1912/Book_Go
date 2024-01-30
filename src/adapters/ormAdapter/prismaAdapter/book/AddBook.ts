import { prisma } from "../../../../../prisma/db";
import { IBook, Book } from "../../../../entities/Book";
import { IAddBook } from "../../repositories/book/IAddBook";


export class AddBook implements IAddBook {

   
    async execute({title, price, genre, synopsis}: Omit<IBook, "id">): Promise <IBook>{
       

        const book = await prisma.book.create({
            data: {
                title: title,
                price: price,
                synopsis: synopsis,                     
                books_tags: {
                 create: {
                    tag: {
                        create:{
                            genre: genre
                        }
                    }
                 }
                 }

              },
              select: {
                id: true,
                title: true,
                synopsis: true,
                price: true,
                books_tags:{
                    select:{
                        tag: {
                            select: {
                                genre: true
                            }
                        }
                    }
                }
                  }
                
            
             
                
        })

        let book1 = {
            
            id: book.id, 
            title: book.title,
            price: book.price,
            synopsis: book.synopsis,
           genre: book.books_tags?.tag.genre || ""
        }
        
       

        return book1

    }
}