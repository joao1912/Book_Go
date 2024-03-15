import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { updateBook } from "../../../adapters/ormAdapter/protocols/bookProtocols.js";
import { Book, IBook } from "../../../entities/Book.js";
import { UpdateBookUseCase } from "../../../usecases/book/UpdateBookUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";

interface IBody extends IBook { }

class UpdateBook implements IController {

    async handle(req: HttpRequest<{ id: any }, {}, IBody>, res: HttpResponse) {

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

            if(response instanceof Book)
            return serverResponse.ok(Formatter.handle<Book>(response))


        
        }

}

const updateBookController = new UpdateBook()

export default updateBookController;