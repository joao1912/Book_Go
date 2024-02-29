import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllComments } from "../../../adapters/ormAdapter/protocols/commentProtocols";
import { Comment, IComment } from "../../../entities/Comment";
import { SearchAllCommentsUseCase } from "../../../usecases/comment/SearchAllCommentsUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";

interface IParams {
    bookId: string;
}

class GetAllCommentsByBookId implements IController {

    async handle(req: HttpRequest<IParams>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const bookId = req.params.bookId;

        if (typeof bookId != 'string') {
            return serverResponse.badRequest('Bad Request: bookId can not be other type besides string')
        }

        try {
            
            const searchAllCommentsUseCase = new SearchAllCommentsUseCase(getAllComments)

            const comments = await searchAllCommentsUseCase.execute(bookId)

            let commentList: Array<IComment> = []

            for (let comment of comments) {
                
                commentList.push(
                    Formatter.handle<Comment>(comment)
                )

            }

            return serverResponse.ok(commentList)

        } catch (error) {

            throw new Error('Bad request: ' + error)
            
        }

    }

}

const getAllCommentsByBookIdController = new GetAllCommentsByBookId()

export default getAllCommentsByBookIdController