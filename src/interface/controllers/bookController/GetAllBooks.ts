import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { getAllBooks } from "../../../adapters/ormAdapter/protocols/bookProtocols.js";
import { Book, IBook } from "../../../entities/Book.js";
import { GetAllBooksUseCase } from "../../../usecases/book/GetAllBooksUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";


class GetAllBooks implements IController {

    async handle(req: HttpRequest, res: HttpResponse){

        const serverResponse = new ServerResponse(res)

        try {

            const serverResponse = new ServerResponse(res)
            const getAllBooksUseCase = new GetAllBooksUseCase(getAllBooks)

            const allBooks = await getAllBooksUseCase.execute()

            let bookList: Array<IBook> = []

            for (let book of allBooks) {

                bookList.push(
                    Formatter.handle<Book>(book)
                )

            }

            return serverResponse.ok(bookList)
            
        } catch (error) {
            console.log("Erroou" + error)
            
            throw new Error("Internal server error")
          
        }
    }
}

const getAllBooksController = new GetAllBooks()

export default getAllBooksController;