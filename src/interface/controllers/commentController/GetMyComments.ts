import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllCommentsByUserId } from "../../../adapters/ormAdapter/protocols/commentProtocols";
import { Comment, IComment } from "../../../entities/Comment";
import { GetMyCommentsUseCase } from "../../../usecases/comment/GetMyCommentsUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";


class GetMyComments implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const userId = req.userId

        const getMycommentsUseCase = new GetMyCommentsUseCase(getAllCommentsByUserId)

        const comments = await getMycommentsUseCase.execute(userId)

        let commentList: Array<IComment> = []

        for (let comment of comments) {

            commentList.push(
                Formatter.handle<Comment>(comment)
            )

        }

        return serverResponse.ok(commentList)

    }

}

const getMycommentsController = new GetMyComments()

export default getMycommentsController