import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { updateBook } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { Book, IBook } from "../../../entities/Book";
import { UpdateBookUseCase } from "../../../usecases/book/UpdateBookUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";

interface IBody extends IBook { }

class UpdateBook implements IController {

    async handle(req: HttpRequest<{ id: any }, {}, IBody>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        try {
            const serverResponse = new ServerResponse(res)
            const bookId = req.params.id
            const {
                title,
                synopsis,
                author,
                price,
                publishedDate,
                genre,
                pageCount
            } = req.body

            const updateBookUseCase = new UpdateBookUseCase(updateBook)

            const response = await updateBookUseCase.execute({
                id: bookId,
                title,
                synopsis,
                author,
                price,
                publishedDate,
                genre,
                pageCount
            })
            switch (true) {
                case (typeof response !== "string"):
                    Formatter.handle<Book>(response)
                    return serverResponse.ok(response)
                    break;

                case (response == "Invalid input type"):
                    return serverResponse.badRequest(response)
                    break;

                case (response == "Internal server error"):
                    return serverResponse.serverError(response)
                    break;
            }


        } catch (error) {
            console.log(error)
            throw new Error("Something happened please try again later")
        }
    }

}

const updateBookController = new UpdateBook()

export default updateBookController;