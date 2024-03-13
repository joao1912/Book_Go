import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol.js";
import { deleteComment, getCommentById } from "../../../adapters/ormAdapter/protocols/commentProtocols.js";
import { DeleteMyCommentUseCase } from "../../../usecases/comment/DeleteMyCommentUseCase.js";
import { GetOneCommentUseCase } from "../../../usecases/comment/GetOneCommentUseCase.js";
import { IController } from "../IController.js";
import ServerResponse from "../utils/ServerResponse.js";

interface IParams {
    commentId: string;
}

class RemoveComment implements IController {

    async handle(req: HttpRequest<IParams>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)
      
        const commentId = req.params.commentId;
        const userId = req.userId

        if (!userId) {
            return serverResponse.badRequest('Bad Request: userId can not be undefined.')
        }

        try {

            const deleteMyCommentUseCase = new DeleteMyCommentUseCase(deleteComment)

            const getOneCommentUseCase = new GetOneCommentUseCase(getCommentById)

            const comment = await getOneCommentUseCase.execute(commentId)
            
            if (comment.props.userId !== userId) {

                return serverResponse.notAuthorized('Bad Request: you dont have access to delete this comment.')

            }

            const message = await deleteMyCommentUseCase.execute(commentId)

            return serverResponse.ok(message)
            
        } catch (error) {

            throw new Error('Bad request: ' + error)
            
        }

    }

}

const removeCommentController = new RemoveComment()

export default removeCommentController