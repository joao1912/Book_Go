import { prisma } from "../db";
import { IBook, Book } from "../../../../entities/Book";
import { IAddBook } from "../../repositories/book/IAddBook";


export class AddBook implements IAddBook {

   
    async execute({title, price, genre, synopsis, author}: Omit<IBook, "id">): Promise <IBook>{
       
        try {

            const book = await prisma.book.create({
                data: {
                    title: title,
                    price: price,
                    synopsis: synopsis, 
                    books_authors: {
                        create: {
                         author: {
                            connectOrCreate: {
                                where:{
                                    name: author
                                },
                                create: {
                                    name: author,
                                  
                                }
                            }
                         }
                        }
                      },                    
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
                    books_authors: {
                        select: {
                          author: true
                        }
                      },
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
            if(typeof book.books_tags?.tag.genre != "string"){
                    throw new Error ("Internal server error: genre must be a string type")
    
                }
            if(typeof book.books_authors?.author != "string"){
                    throw new Error ("Internal server error: Author must be a string type")
    
                }
            
            let newBook = {
                
                id: book.id, 
                title: book.title,
                price: book.price,
                author: book.books_authors?.author,
                synopsis: book.synopsis,
                genre: book.books_tags?.tag.genre 
            }
            
           
    
            return newBook
            
        } catch (error) {
            throw new Error("Internal server error: " + error);
        }
    

    }
}