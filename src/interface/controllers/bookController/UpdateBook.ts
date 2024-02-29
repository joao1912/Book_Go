import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { updateBook } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { Book, IBook } from "../../../entities/Book";
import { UpdateBookUseCase } from "../../../usecases/book/UpdateBookUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";

interface IBody extends IBook{}

class UpdateBook implements IController {

    async handle (req: HttpRequest<{id: any},{}, IBody>, res: HttpResponse){

        try {
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

            const bookInstance = await updateBookUseCase.execute({
                id: bookId,
                title,
                synopsis,
                author,
                price,
                publishedDate,
                genre,
                pageCount
            })

            res.status(200).json(
                Formatter.handle<Book>(bookInstance)
            )
    
        } catch(error){
            throw new Error ("Bad request: " + error)
        }
    }

}

const updateBookController = new UpdateBook()

export default updateBookController;