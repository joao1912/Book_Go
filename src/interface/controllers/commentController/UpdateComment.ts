import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { updateComment } from "../../../adapters/ormAdapter/protocols/commentProtocols.js";
import { Comment, IComment } from "../../../entities/Comment.js";
import { EditMyCommentUseCase } from "../../../usecases/comment/EditMyCommentUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";

interface IBody extends IComment {}

class UpdateComment implements IController {

    async handle(req: HttpRequest<{}, {}, IBody>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)
        
        const commentData = req.body;

        const userId = req.userId;

        if (!userId) {
            return serverResponse.badRequest('Bad Request: userId can not be undefined')
        }

        try {
            
            const editMyCommentUseCase = new EditMyCommentUseCase(updateComment)

            const commentUpdated = await editMyCommentUseCase.execute(commentData)

            return serverResponse.ok(
                Formatter.handle<Comment>(commentUpdated)
            )

        } catch (error) {

            throw new Error('Bad request: ' + error)
            
        }

    }
    
}

const updateCommentController = new UpdateComment()

export default updateCommentController