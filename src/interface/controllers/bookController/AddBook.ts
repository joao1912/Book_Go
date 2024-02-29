import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { addBook } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { Book, IBook } from "../../../entities/Book";
import { AddBookUseCase } from "../../../usecases/book/AddBookUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";

interface IBody extends IBook {}

class AddBook implements IController {

    async handle(req: HttpRequest<{}, {}, IBody>, res: HttpResponse){
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

            return serverResponse.ok(
                Formatter.handle<Book>(bookInstance)
            )
            
        } catch (error) {
            console.log("Erro ao criar livro" + error)
            return serverResponse.badRequest("Internal server error. Look for superadmin haha")
        }

    }
}

const addBookController = new AddBook()

export default addBookController