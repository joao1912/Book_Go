import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllComments } from "../../../adapters/ormAdapter/protocols/commentProtocols";
import { SearchAllCommentsUseCase } from "../../../usecases/comment/SearchAllCommentsUseCase";
import { IController } from "../IController";

class GetAllCommentsByBookId implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

        const bookId = req.params.bookId;

        if (typeof bookId != 'string') throw new Error('Bad Request: bookId can not be other type besides string')

        try {
            
            const searchAllCommentsUseCase = new SearchAllCommentsUseCase(getAllComments)

            const comments = await searchAllCommentsUseCase.execute(bookId)

            res.status(200).json(comments)

        } catch (error) {

            throw new Error('Bad request: ' + error)
            
        }

    }

}

const getAllCommentsByBookIdController = new GetAllCommentsByBookId()

export default getAllCommentsByBookIdController