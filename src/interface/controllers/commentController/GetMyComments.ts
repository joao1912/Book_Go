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

        if (!userId) {
            return serverResponse.badRequest('Bad Request: userId can not be undefined')
        }

        const getMycommentsUseCase = new GetMyCommentsUseCase(getAllCommentsByUserId)

        try {
            
            const comments = await getMycommentsUseCase.execute(userId)

            let commentList: Array<IComment> = []

            for (let comment of comments) {
                
                commentList.push(
                    Formatter.handle<Comment>(comment)
                )

            }

            return serverResponse.ok(commentList)

        } catch (error) {

            throw new Error('Bad Request: ' + error)
            
        }

    }

}

const getMycommentsController = new GetMyComments()

export default getMycommentsController