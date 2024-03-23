import { ISearchBookById } from "../../adapters/ormAdapter/repositories/book/ISearchBookById"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"


export class SearchBookByIdUseCase {

    protected getBookByBookIdService: ISearchBookById
    constructor(ormAdapter: ISearchBookById) {
        this.getBookByBookIdService = ormAdapter
    }

    async execute(id: string | undefined) {

        const validatedId = validatorAdapter.validateId(id)

        return await this.getBookByBookIdService.execute(validatedId)

    }

}
