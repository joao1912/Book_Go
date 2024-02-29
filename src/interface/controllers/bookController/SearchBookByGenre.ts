import ServerResponse from "../utils/ServerResponse";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { searchBookByGenre } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { SearchBookByGenreUseCase } from "../../../usecases/book/SearchBookByGenreUseCase";
import { IController } from "../IController";
import { Book } from "../../../entities/Book";




class SearchBookByGenre implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {
        const serverResponse = new ServerResponse(res)

        try {
            const genre = req.body.genre

            const searchBookByGenreUseCase = new SearchBookByGenreUseCase(searchBookByGenre)

            const response = await searchBookByGenreUseCase.execute(genre)
            
            if(typeof response == "string"){
                return serverResponse.notFound(response)
            }
            
            return serverResponse.ok(response)

        } catch (error) {
            throw new Error("Bad Request: " + error)

        }
    }
}

const searchBookByGenreController = new SearchBookByGenre()

export default searchBookByGenreController