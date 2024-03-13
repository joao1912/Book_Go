import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { createComment } from "../../../adapters/ormAdapter/protocols/commentProtocols.js";
import { Comment, IComment } from "../../../entities/Comment.js";
import { CreateCommentUseCase } from "../../../usecases/comment/CreateCommentUseCase.js";
import { IController } from "../IController.js";
import Formatter from "../utils/Formatter.js";
import ServerResponse from "../utils/ServerResponse.js";

interface IBody extends IComment {}

class CreateComment implements IController {

    async handle(req: HttpRequest<{}, {}, IBody>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const commentData = req.body;

        const userId = req.userId;

        if (typeof userId != 'string') {
            return serverResponse.badRequest('Bad Request: userId can not be other type besides string')
        }

        try {
            
            const createCommentUseCase = new CreateCommentUseCase(createComment)

            const newComment = await createCommentUseCase.execute({...commentData, userId})

            return serverResponse.ok(
                Formatter.handle<Comment>(newComment)
            )

        } catch (error) {

            throw new Error('Bad request: ' + error)
            
        }

    }
    
}

const createCommentController = new CreateComment()

export default createCommentController