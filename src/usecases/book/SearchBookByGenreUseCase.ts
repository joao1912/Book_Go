import { ISearchBookByGenre } from "../../adapters/ormAdapter/repositories/book/ISearchBookByGenre"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"



export class SearchBookByGenreUseCase {

    protected bookService: ISearchBookByGenre
    constructor(ormAdapter: ISearchBookByGenre) {
        this.bookService = ormAdapter
    }

    async execute(bookGenre: string) {

        if (!bookGenre) ServerResponse.missingParameters('BookError', 'Precisa do genero em string')

        return await this.bookService.execute(bookGenre)

    }

}

