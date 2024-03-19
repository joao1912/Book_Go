import { IAddBook } from "../../adapters/ormAdapter/repositories/book/IAddBook"
import { Book, IBook } from "../../entities/Book"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"
import * as z from 'zod'
import zodErrorMap from "../utils/zodErrorMap"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"
import { SchemaKey } from "../../adapters/validatorAdapter/repository/IValidatorAdapterRepository"

export class AddBookUseCase {

    protected bookService: IAddBook
    constructor(ormAdapter: IAddBook) {
        this.bookService = ormAdapter
    }

    async execute(bookData: IBook) {

        const validatedData = validatorAdapter.validateSchema<IBook>(bookData, SchemaKey.book)

        const bookInstance = new Book(validatedData)

        return await this.bookService.execute(bookInstance)


    }

}

/* const ZBook = z.object({
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
const result = ZBook.parse(bookData) */


// for (let keyProp in bookData) {
//     let valueProp = bookData[keyProp]
//     console.log(typeof keyProp, typeof bookData[keyProp])
//     if (!valueProp) {
//         ServerResponse.badRequest("AdminError", `${keyProp.toUpperCase()} cannot be empty/undefined`)
//     }
// }
