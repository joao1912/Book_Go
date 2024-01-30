import { ISearchBookByGenre } from "../../adapters/ormAdapter/repositories/book/ISearchBookByGenre"
import { ISearchBookByTitle } from "../../adapters/ormAdapter/repositories/book/ISearchBookByTitle"
import { IBook } from "../../entities/Book"


export class SearchBookByGenreUseCase {

    protected bookService: ISearchBookByGenre
    constructor(ormAdapter: ISearchBookByGenre) {
        this.bookService = ormAdapter
    }

    async execute(bookGenre: string) {

        return await this.bookService.execute(bookGenre)

    }

}

