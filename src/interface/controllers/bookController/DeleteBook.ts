import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { deleteBook } from "../../../adapters/ormAdapter/protocols/bookProtocols.js";
import { DeleteBookUseCase } from "../../../usecases/book/DeleteBookUseCase.js";
import { IController } from "../IController.js";
import ServerResponse from "../utils/ServerResponse.js";


class DeleteBook implements IController {

    async handle(req: HttpRequest<{ id: any }>, res: HttpResponse) {


        try {

            const serverResponse = new ServerResponse(res)
            const bookId = req.params.id
            const deleteBookUseCase = new DeleteBookUseCase(deleteBook)

            const response = await deleteBookUseCase.execute(bookId)

            switch (true) {

                case (response.message == "Id provided does not exist."):
                    return serverResponse.notFound(response)
                    break;

                case (response.message == "Internal server error"):
                    return serverResponse.serverError(response)
                    break;
            }

            return serverResponse.ok(response)

        } catch (error) {
            console.log(error)
            throw new Error("Something happened. Please try again later")
        }

    }
}

const deleteBookController = new DeleteBook()

export default deleteBookController