import ServerResponse from "../utils/ServerResponse";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { searchBookByGenre } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { SearchBookByGenreUseCase } from "../../../usecases/book/SearchBookByGenreUseCase";
import { IController } from "../IController";
import { Book, IBook } from "../../../entities/Book";
import Formatter from "../utils/Formatter";




class SearchBookByGenre implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {
        const serverResponse = new ServerResponse(res)

        try {
            const genre = req.body.genre

            const searchBookByGenreUseCase = new SearchBookByGenreUseCase(searchBookByGenre)

            const bookInstances = await searchBookByGenreUseCase.execute(genre)
            
            let bookList: Array<IBook> = []

            for (let book of bookInstances) {

                bookList.push(
                    Formatter.handle<Book>(book)
                )

            }

            res.status(200).json(bookList)
            
        } catch (error) {
            throw new Error("Bad Request: " + error)

        }
    }
}

const searchBookByGenreController = new SearchBookByGenre()

export default searchBookByGenreController