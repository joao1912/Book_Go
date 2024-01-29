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
                // books_tags: {
                //  tag:{
                //     create:{
                //         genre:genre
                //     }
                //  }

                    
                //   }

                        
                     

                    
                //     connect:{
                //     }
                // } 
                   
              },
              select: {
                id: true,
                title: true,
                synopsis: true,
                price: true,
                genre: true
                  }
                
            
             
                
        })
        return book

    }
}