import ServerResponse from "../ServerResponse";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { searchBookByGenre } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { SearchBookByGenreUseCase } from "../../../usecases/book/SearchBookByGenreUseCase";
import { IController } from "../IController";




class SearchBookByGenre implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {
        const serverResponse = new ServerResponse(res)

        try {
            const genre = req.body.genre

            const searchBookByGenreUseCase = new SearchBookByGenreUseCase(searchBookByGenre)

            const bookInstance = await searchBookByGenreUseCase.execute(genre)
            
            return serverResponse.ok(bookInstance)
        } catch (error) {
            throw new Error("Bad Request: " + error)

        }
    }
}

const searchBookByGenreController = new SearchBookByGenre()

export default searchBookByGenreController