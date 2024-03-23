import { IDeleteBook } from "../../adapters/ormAdapter/repositories/book/IDeleteBook";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class DeleteBookUseCase {

    protected deleteBookService: IDeleteBook

    constructor(ormAdapter: IDeleteBook) {
        this.deleteBookService = ormAdapter
    }

    async execute(id: string | undefined) {

        const validatedId = validatorAdapter.validateId(id)

        return await this.deleteBookService.execute(validatedId)

    }

}