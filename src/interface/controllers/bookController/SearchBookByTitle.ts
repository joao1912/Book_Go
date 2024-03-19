import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { searchBookByTitle } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { Book, IBook } from "../../../entities/Book";
import { SearchBookByTitleUseCase } from "../../../usecases/book/SearchBookByTitleUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


class SearchBookByTitle implements IController {

    async handle(req: HttpRequest<{title: string}>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const title = req.params.title

        const searchBookByTitleUseCase = new SearchBookByTitleUseCase(searchBookByTitle)

        const response: Book[] = await searchBookByTitleUseCase.execute(title)

        let bookList: Array<IBook> = []
        if (response instanceof Book && Array.isArray(response)) {
            for (let book of response) {

                bookList.push(
                    Formatter.handle<Book>(book)
                )

            }
        }
            
        return serverResponse.ok(bookList)
    }
}


const searchBookByTitleController = new SearchBookByTitle()

export default searchBookByTitleController