import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { getAllBooks } from "../../../adapters/ormAdapter/protocols/bookProtocols.js";
import { Book, IBook } from "../../../entities/Book.js";
import { GetAllBooksUseCase } from "../../../usecases/book/GetAllBooksUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";


class GetAllBooks implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {


        const serverResponse = new ServerResponse(res)
        
        const getAllBooksUseCase = new GetAllBooksUseCase(getAllBooks)

        const response = await getAllBooksUseCase.execute()

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

const getAllBooksController = new GetAllBooks()

export default getAllBooksController;