import ServerResponse from "../utils/ServerResponse";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { searchBookByGenre } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { SearchBookByGenreUseCase } from "../../../usecases/book/SearchBookByGenreUseCase";
import { IController } from "../IController";
import { Book, IBook } from "../../../entities/Book";
import Formatter from "../utils/Formatter";

class SearchBookByGenre implements IController {

    async handle(req: HttpRequest<{},{},{},{genre: string }>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)
        const genre = req.query.genre

        const searchBookByGenreUseCase = new SearchBookByGenreUseCase(searchBookByGenre)

        const response: Book[] = await searchBookByGenreUseCase.execute(genre)

        let bookList: Array<IBook> = []

        for (let book of response) {

            bookList.push(
                Formatter.handle<Book>(book)
            )

        }

        return serverResponse.ok(bookList)



    }
}

const searchBookByGenreController = new SearchBookByGenre()

export default searchBookByGenreController