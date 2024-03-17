import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllComments } from "../../../adapters/ormAdapter/protocols/commentProtocols";
import { Comment, IComment } from "../../../entities/Comment";
import { SearchAllCommentsUseCase } from "../../../usecases/comment/SearchAllCommentsUseCase";
import { IController } from "../IController";
import { CustomError } from "../utils/CustomError";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";

interface IParams {
    bookId: string;
}

class GetAllCommentsByBookId implements IController {

    async handle(req: HttpRequest<IParams>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const bookId = req.params.bookId;


        const searchAllCommentsUseCase = new SearchAllCommentsUseCase(getAllComments)

        const comments = await searchAllCommentsUseCase.execute(bookId)

        let commentList: Array<IComment> = []

        for (let comment of comments) {

            commentList.push(
                Formatter.handle<Comment>(comment)
            )

        }

        return serverResponse.ok(commentList)

    }

}

const getAllCommentsByBookIdController = new GetAllCommentsByBookId()

export default getAllCommentsByBookIdController