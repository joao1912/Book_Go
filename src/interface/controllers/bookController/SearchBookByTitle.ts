import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { searchBookByTitle } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { SearchBookByTitleUseCase } from "../../../usecases/book/SearchBookByTitleUseCase";


class SearchBookByTitle {

    async handle(req: HttpRequest, res: HttpResponse){

        try {

            const title = req.body.title

            const searchBookByTitleUseCase = new SearchBookByTitleUseCase(searchBookByTitle)

            const bookInstance = await searchBookByTitleUseCase.execute(title)

            res.status(200).json(bookInstance)
            
        } catch (error) {
            throw new Error ("Bad request: " + error)
        }
    }
}

const searchBookByTitleController = new SearchBookByTitle()

export default searchBookByTitleController