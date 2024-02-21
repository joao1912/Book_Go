import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { deleteComment } from "../../../adapters/ormAdapter/protocols/commentProtocols";
import { DeleteMyCommentUseCase } from "../../../usecases/comment/DeleteMyCommentUseCase";
import { IController } from "../IController";

interface IParams {
    commentId: string;
}

class RemoveComment implements IController {

    async handle(req: HttpRequest<IParams>, res: HttpResponse) {
      
        const commentId = req.params.commentId;

        try {

            const deleteMyCommentUseCase = new DeleteMyCommentUseCase(deleteComment)

            const message = await deleteMyCommentUseCase.execute(commentId)

            res.status(200).json(message)
            
        } catch (error) {

            throw new Error('Bad request: ' + error)
            
        }

    }

}

const removeCommentController = new RemoveComment()

export default removeCommentController