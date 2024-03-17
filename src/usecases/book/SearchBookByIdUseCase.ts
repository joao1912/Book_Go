import { ISearchBookById } from "../../adapters/ormAdapter/repositories/book/ISearchBookById"


export class SearchBookByIdUseCase {

    protected bookService: ISearchBookById
    constructor(ormAdapter: ISearchBookById) {
        this.bookService = ormAdapter
    }

    async execute(id: string) {

        return await this.bookService.execute(id)

    }

}

