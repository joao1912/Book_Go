import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllBooks } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { GetAllBooksUseCase } from "../../../usecases/book/GetAllBooksUseCase";


class GetAllBooks {

    async handle(req: HttpRequest, res: HttpResponse){

        try {

            const getAllBooksUseCase = new GetAllBooksUseCase(getAllBooks)

            const allBooks = await getAllBooksUseCase.execute()

            res.status(200).json(allBooks)
            
        } catch (error) {
            throw new Error ("Bad request: " + error)
        }
    }
}

const getAllBooksController = new GetAllBooks()

export default getAllBooksController;