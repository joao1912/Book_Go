import { ISearchBookByTitle } from "../../adapters/ormAdapter/repositories/book/ISearchBookByTitle"
import { IBook } from "../../entities/Book"


export class SearchBookByTitleUseCase {

    protected bookService: ISearchBookByTitle
    constructor(ormAdapter: ISearchBookByTitle) {
        this.bookService = ormAdapter
    }

    async execute(bookTitle: string) {

        return await this.bookService.execute(bookTitle)

    }

}

