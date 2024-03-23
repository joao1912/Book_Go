import { SearchBookById } from "../../adapters/ormAdapter/prismaAdapter/book/SearchBookById"
import { IUpdateBook } from "../../adapters/ormAdapter/repositories/book/IUpdateBook"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"
import { SchemaKey } from "../../adapters/validatorAdapter/repository/IValidatorAdapterRepository"
import { Book, IBook } from "../../entities/Book"


export class UpdateBookUseCase {

    protected updateBookService: IUpdateBook
    constructor(ormAdapter: IUpdateBook) {
        this.updateBookService = ormAdapter
    }

    async execute(bookData: IBook) {

        const searchBookById = new SearchBookById()
        const validateId = validatorAdapter.validateId(bookData.id)
        const validateData = validatorAdapter.validatePartial<Partial<IBook>>(bookData, SchemaKey.book)
        const schemaData = await searchBookById.execute(validateId)

        const bookDataToUpdate = {...schemaData.props, ...validateData}
        
        const bookInstance = new Book(bookDataToUpdate)

        return await this.updateBookService.execute(bookInstance)

    }

}
