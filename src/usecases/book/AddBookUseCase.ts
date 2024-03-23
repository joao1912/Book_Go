import { IAddBook } from "../../adapters/ormAdapter/repositories/book/IAddBook"
import { Book, IBook } from "../../entities/Book"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"
import { SchemaKey } from "../../adapters/validatorAdapter/repository/IValidatorAdapterRepository"

export class AddBookUseCase {

    protected addBookService: IAddBook
    constructor(ormAdapter: IAddBook) {
        this.addBookService = ormAdapter
    }

    async execute(bookData: IBook) {

        const validatedData = validatorAdapter.validateSchema<IBook>(bookData, SchemaKey.book)

        const bookInstance = new Book(validatedData)

        return await this.addBookService.execute(bookInstance)


    }

}
