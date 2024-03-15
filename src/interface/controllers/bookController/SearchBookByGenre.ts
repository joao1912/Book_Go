import ServerResponse from "../utils/ServerResponse.js";
import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { searchBookByGenre } from "../../../adapters/ormAdapter/protocols/bookProtocols.js";
import { SearchBookByGenreUseCase } from "../../../usecases/book/SearchBookByGenreUseCase.js";
import { IController } from "../IController.js";
import { Book, IBook } from "../../../entities/Book.js";
import Formatter from "../utils/Formatter.js";




class SearchBookByGenre implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {
        const serverResponse = new ServerResponse(res)

            const genre = req.params.genre

            const searchBookByGenreUseCase = new SearchBookByGenreUseCase(searchBookByGenre)

            const response = await searchBookByGenreUseCase.execute(genre)
            

            let bookList: Array<IBook> = []
            if (response instanceof Book && Array.isArray(response)){
            for (let book of response) {

                bookList.push(
                    Formatter.handle<Book>(book)
                )

            }
            
            return serverResponse.ok(bookList)
        }
            
      
    }
}

const searchBookByGenreController = new SearchBookByGenre()

export default searchBookByGenreController