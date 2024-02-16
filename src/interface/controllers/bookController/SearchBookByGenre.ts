import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { searchBookByGenre } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { SearchBookByGenreUseCase } from "../../../usecases/book/SearchBookByGenreUseCase";


interface genre {
    genre: string
}
interface IBody extends genre { }

class SearchBookByGenre {

    async handle(req: HttpRequest<{}, {}, IBody>, res: HttpResponse) {
        try {
            const genre = req.body

            const searchBookByGenreUseCase = new SearchBookByGenreUseCase(searchBookByGenre)

            const bookInstance = await searchBookByGenreUseCase.execute(genre)

            res.status(200).json(bookInstance)
        } catch (error) {
            throw new Error("Bad Request: " + error)

        }
    }
}

const searchBookByGenreController = new SearchBookByGenre()

export default searchBookByGenreController