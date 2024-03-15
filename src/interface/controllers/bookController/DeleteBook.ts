import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { deleteBook } from "../../../adapters/ormAdapter/protocols/bookProtocols.js";
import { DeleteBookUseCase } from "../../../usecases/book/DeleteBookUseCase.js";
import { IController } from "../IController.js";
import ServerResponse from "../utils/ServerResponse.js";


class DeleteBook implements IController {

    async handle(req: HttpRequest<{ id: any }>, res: HttpResponse) {


        const serverResponse = new ServerResponse(res)

        const bookId = req.params.id
        const deleteBookUseCase = new DeleteBookUseCase(deleteBook)

        const response = await deleteBookUseCase.execute(bookId)


        return serverResponse.ok(response)



    }
}

const deleteBookController = new DeleteBook()

export default deleteBookController