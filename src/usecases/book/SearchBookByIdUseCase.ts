import { ISearchBookById } from "../../adapters/ormAdapter/repositories/book/ISearchBookById"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"


export class SearchBookByIdUseCase {

    protected bookService: ISearchBookById
    constructor(ormAdapter: ISearchBookById) {
        this.bookService = ormAdapter
    }

    async execute(id: string | undefined) {

        const validatedId = validatorAdapter.validateId(id)

        return await this.bookService.execute(validatedId)

    }

}

