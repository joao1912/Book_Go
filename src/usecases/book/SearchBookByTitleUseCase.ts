import { ISearchBookByTitle } from "../../adapters/ormAdapter/repositories/book/ISearchBookByTitle"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"


export class SearchBookByTitleUseCase {

    protected getBookByTitleService: ISearchBookByTitle
    constructor(ormAdapter: ISearchBookByTitle) {
        this.getBookByTitleService = ormAdapter
    }

    async execute(bookTitle: string) {

        if (!bookTitle) ServerResponse.missingParameters('BookError', 'This requires the title as a string.')

        return await this.getBookByTitleService.execute(bookTitle)

    }

}
