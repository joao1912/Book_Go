import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { addBook } from "../../../adapters/ormAdapter/protocols/bookProtocols.js";
import { Book, IBook } from "../../../entities/Book.js";
import { AddBookUseCase } from "../../../usecases/book/AddBookUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";

interface IBody extends IBook { }

class AddBook implements IController {

    async handle(req: HttpRequest<{}, {}, IBody>, res: HttpResponse) {
        const serverResponse = new ServerResponse(res)

        try {
            const {
                title,
                synopsis,
                author,
                price,
                publishedDate,
                genre,
                pageCount
            } = req.body

            const addBookUseCase = new AddBookUseCase(addBook)

            const response = await addBookUseCase.execute({
                title,
                synopsis,
                author,
                price,
                publishedDate,
                genre,
                pageCount

            })
            
            switch (true) {
                case (response instanceof Book):
                    return serverResponse.ok(Formatter.handle<Book>(response))
                    break;

                case (response == "Invalid input type provided."):
                    return serverResponse.badRequest(response)
                    break;

                case (response == "Internal server error"):
                    return serverResponse.serverError(response)
                    break;
            }

        } catch (error) {
            console.log(error)
            throw new Error("Something happened. Please try again later")
        }

    }
}

const addBookController = new AddBook()

export default addBookController