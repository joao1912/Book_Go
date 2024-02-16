import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { addBook } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { IBook } from "../../../entities/Book";
import { AddBookUseCase } from "../../../usecases/book/AddBookUseCase";

interface IBody extends IBook {}

class AddBook {

    async handle(req: HttpRequest<{}, {}, IBody>, res: HttpResponse){

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

            const bookInstance = await addBookUseCase.execute({
                title,
                synopsis,
                author,
                price,
                publishedDate,
                genre,
                pageCount
                
            })

            res.status(200).json(bookInstance)
        } catch (error) {
            throw new Error ("Bad request: " + error)
        }

    }
}

const addBookController = new AddBook()

export default addBookController