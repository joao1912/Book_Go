import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { searchBookByTitle } from "../../../adapters/ormAdapter/protocols/bookProtocols";
import { Book } from "../../../entities/Book";
import { SearchBookByTitleUseCase } from "../../../usecases/book/SearchBookByTitleUseCase";
import { IController } from "../IController";
import ServerResponse from "../utils/ServerResponse";


class SearchBookByTitle implements IController {

    async handle(req: HttpRequest, res: HttpResponse){

        try {
            const serverResponse = new ServerResponse(res)

            const title = req.body.title

            const searchBookByTitleUseCase = new SearchBookByTitleUseCase(searchBookByTitle)

            const response = await searchBookByTitleUseCase.execute(title)

            if(typeof response == "string"){
            return serverResponse.notFound(response)
        }
        
        return serverResponse.ok(response)
            
        } catch (error) {
            throw new Error ("Bad request: " + error)
        }
    }
}

const searchBookByTitleController = new SearchBookByTitle()

export default searchBookByTitleController