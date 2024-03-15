import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { getAllComments } from "../../../adapters/ormAdapter/protocols/commentProtocols.js";
import { Comment, IComment } from "../../../entities/Comment.js";
import { SearchAllCommentsUseCase } from "../../../usecases/comment/SearchAllCommentsUseCase.js";
import { IController } from "../IController.js";
import { CustomError } from "../utils/CustomError.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";

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