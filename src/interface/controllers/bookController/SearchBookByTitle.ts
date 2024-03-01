import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { searchBookByTitle } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { Book, IBook } from "../../../entities/Book";
import { SearchBookByTitleUseCase } from "../../../usecases/book/SearchBookByTitleUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


class SearchBookByTitle implements IController {

    async handle(req: HttpRequest, res: HttpResponse){

        const serverResponse = new ServerResponse(res)

        try {
            const serverResponse = new ServerResponse(res)

            const title = req.body.title

            const searchBookByTitleUseCase = new SearchBookByTitleUseCase(searchBookByTitle)

            const response = await searchBookByTitleUseCase.execute(title)
         
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
            throw new Error("Something happened. Please try again later")        }
    }
}

const searchBookByTitleController = new SearchBookByTitle()

export default searchBookByTitleController