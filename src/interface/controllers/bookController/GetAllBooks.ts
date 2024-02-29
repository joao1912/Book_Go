import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllBooks } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { GetAllBooksUseCase } from "../../../usecases/book/GetAllBooksUseCase";
import { IController } from "../IController";
import ServerResponse from "../utils/ServerResponse";


class GetAllBooks implements IController {

    async handle(req: HttpRequest, res: HttpResponse){

        try {

            const serverResponse = new ServerResponse(res)
            const getAllBooksUseCase = new GetAllBooksUseCase(getAllBooks)

            const allBooks = await getAllBooksUseCase.execute()

           return serverResponse.ok(allBooks)
            
        } catch (error) {
            console.log("Erroou" + error)
            
            throw new Error("Internal server error")
          
        }
    }
}

const getAllBooksController = new GetAllBooks()

export default getAllBooksController;