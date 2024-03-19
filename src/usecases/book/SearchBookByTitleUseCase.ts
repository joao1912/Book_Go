import { ISearchBookByTitle } from "../../adapters/ormAdapter/repositories/book/ISearchBookByTitle"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"


export class SearchBookByTitleUseCase {

    protected bookService: ISearchBookByTitle
    constructor(ormAdapter: ISearchBookByTitle) {
        this.bookService = ormAdapter
    }

    async execute(bookTitle: string) {

        if (!bookTitle) ServerResponse.missingParameters('BookError', 'Precisa do titulo em string')

        return await this.bookService.execute(bookTitle)

    }

}

