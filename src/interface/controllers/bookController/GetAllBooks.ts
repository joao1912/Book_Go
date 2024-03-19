import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllBooks } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { Book, IBook } from "../../../entities/Book";
import { GetAllBooksUseCase } from "../../../usecases/book/GetAllBooksUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


class GetAllBooks implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {


        const serverResponse = new ServerResponse(res)

        const getAllBooksUseCase = new GetAllBooksUseCase(getAllBooks)

        const response: Book[] = await getAllBooksUseCase.execute()

        let bookList: Array<IBook> = []

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