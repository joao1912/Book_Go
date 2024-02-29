import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { deleteBook } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { DeleteBookUseCase } from "../../../usecases/book/DeleteBookUseCase";
import { IController } from "../IController";


class DeleteBook implements IController {

    async handle(req: HttpRequest<{id:any}>, res: HttpResponse){

        try {
            const bookId = req.params.id
            const deleteBookUseCase = new DeleteBookUseCase(deleteBook)
            
            const message  = await deleteBookUseCase.execute(bookId)

            res.status(200).json(message)

        } catch (error) {
            throw new Error ("Bad request: " + error)
        }

    }
}

const deleteBookController = new DeleteBook()

export default deleteBookController