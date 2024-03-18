import { IAddBook } from "../../adapters/ormAdapter/repositories/book/IAddBook"
import { Book, IBook } from "../../entities/Book"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"
import * as z from 'zod'
import zodErrorMap from "../utils/zodErrorMap"

export class AddBookUseCase {

    protected bookService: IAddBook
    constructor(ormAdapter: IAddBook) {
        this.bookService = ormAdapter
    }

    async execute(bookData: IBook) {
        try {

            const ZBook = z.object({
                id: z.string().optional(),
                title: z.string(),
                author: z.string(),
                synopsis: z.string(),
                price: z.number(),
                genre: z.string(),
                publishedDate: z.string(),
                pageCount: z.number(), 
                image: z.string().optional()
            }) 
            const result = ZBook.parse(bookData)
          
    
            // for (let keyProp in bookData) {
            //     let valueProp = bookData[keyProp]
            //     console.log(typeof keyProp, typeof bookData[keyProp])
            //     if (!valueProp) {
            //         ServerResponse.badRequest("AdminError", `${keyProp.toUpperCase()} cannot be empty/undefined`)
            //     }
            // }
    
    
    
            const bookInstance = new Book(bookData)
    
            return await this.bookService.execute(bookInstance)
    
            
        } catch (error) {
              zodErrorMap
            
            console.log("Erro desconhecido addbook", error)
        }
       
    }

}
