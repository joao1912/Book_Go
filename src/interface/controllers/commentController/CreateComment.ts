import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { createComment } from "../../../adapters/ormAdapter/protocols/commentProtocols";
import { Comment, IComment } from "../../../entities/Comment";
import { CreateCommentUseCase } from "../../../usecases/comment/CreateCommentUseCase";
import { IController } from "../IController";
import Formatter from "../utils/Formatter";
import ServerResponse from "../utils/ServerResponse";

interface IBody extends IComment {}

class CreateComment implements IController {

    async handle(req: HttpRequest<{}, {}, IBody>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const commentData = req.body;

        const userId = req.userId;

        if (typeof userId != 'string') {
            return ServerResponse.badRequest('CommentError', 'Bad Request: userId can not be other type besides string')
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