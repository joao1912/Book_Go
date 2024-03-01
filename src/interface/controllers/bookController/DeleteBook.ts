import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { deleteBook } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { DeleteBookUseCase } from "../../../usecases/book/DeleteBookUseCase";
import { IController } from "../IController";
import ServerResponse from "../utils/ServerResponse";


class DeleteBook implements IController {

    async handle(req: HttpRequest<{id:any}>, res: HttpResponse){


        try {

            const serverResponse = new ServerResponse(res)
            const bookId = req.params.id
            const deleteBookUseCase = new DeleteBookUseCase(deleteBook)
            
            const response  = await deleteBookUseCase.execute(bookId)
           
            switch (true) {
              
                case (response.message == "Id does not exist."):
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