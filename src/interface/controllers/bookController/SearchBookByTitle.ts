import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { searchBookByTitle } from "../../../adapters/ormAdapter/protocols/bookProtocols.js";
import { Book, IBook } from "../../../entities/Book.js";
import { SearchBookByTitleUseCase } from "../../../usecases/book/SearchBookByTitleUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";


class SearchBookByTitle implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {


        const serverResponse = new ServerResponse(res)

        const title = req.params.title

        const searchBookByTitleUseCase = new SearchBookByTitleUseCase(searchBookByTitle)

        const response = await searchBookByTitleUseCase.execute(title)


        let bookList: Array<IBook> = []
        if (response instanceof Book && Array.isArray(response))
            for (let book of response) {

                bookList.push(
                    Formatter.handle<Book>(book)
                )

            }
        return serverResponse.ok(bookList)
    }
}


const searchBookByTitleController = new SearchBookByTitle()

export default searchBookByTitleController