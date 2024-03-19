import { IUpdateBook } from "../../adapters/ormAdapter/repositories/book/IUpdateBook"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"
import { SchemaKey } from "../../adapters/validatorAdapter/repository/IValidatorAdapterRepository"
import { Book, IBook } from "../../entities/Book.js"


export class UpdateBookUseCase {

    protected bookService: IUpdateBook
    constructor(ormAdapter: IUpdateBook) {
        this.bookService = ormAdapter
    }

    async execute(bookData: IBook) {

        const validatedData = validatorAdapter.validateSchema<IBook>(bookData, SchemaKey.book)
        
        const bookInstance = new Book(validatedData)

        return await this.bookService.execute(bookInstance)

    }

}
