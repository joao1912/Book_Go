import { IDeleteBook } from "../../adapters/ormAdapter/repositories/book/IDeleteBook";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class DeleteBookUseCase {

    protected bookService: IDeleteBook

    constructor(ormAdapter: IDeleteBook) {
        this.bookService = ormAdapter
    }

    async execute(id: string | undefined) {

        const validatedId = validatorAdapter.validateId(id)

        return await this.bookService.execute(validatedId)

    }

}