import { ISearchBookByGenre } from "../../adapters/ormAdapter/repositories/book/ISearchBookByGenre"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"


export class SearchBookByGenreUseCase {

    protected getBookByGenreService: ISearchBookByGenre
    constructor(ormAdapter: ISearchBookByGenre) {
        this.getBookByGenreService = ormAdapter
    }

    async execute(bookGenre: string) {

        if (!bookGenre) ServerResponse.missingParameters('BookError', 'This requires the gender as a string.')

        return await this.getBookByGenreService.execute(bookGenre)

    }

}
