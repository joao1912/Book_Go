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

            const response = await searchBookByGenreUseCase.execute(genre)
            
            if(typeof response == "string"){
                return serverResponse.notFound(response)
            }

            let bookList: Array<IBook> = []

            for (let book of response) {

                bookList.push(
                    Formatter.handle<Book>(book)
                )

            }
            
            return serverResponse.ok(bookList)
            
            
        } catch (error) {
            console.log(error)
            throw new Error("Something happened. Please try again later")  
        }
    }
}

const searchBookByGenreController = new SearchBookByGenre()

export default searchBookByGenreController