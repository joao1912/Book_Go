import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { deleteComment, getCommentById } from "../../../adapters/ormAdapter/protocols/commentProtocols";
import { DeleteMyCommentUseCase } from "../../../usecases/comment/DeleteMyCommentUseCase";
import { GetOneCommentUseCase } from "../../../usecases/comment/GetOneCommentUseCase";
import { IController } from "../IController";

interface IParams {
    commentId: string;
}

class RemoveComment implements IController {

    async handle(req: HttpRequest<IParams>, res: HttpResponse) {
      
        const commentId = req.params.commentId;
        const userId = req.userId

        if (!userId) throw new Error('Bad Request: userId can not be undefined.')

        try {

            const deleteMyCommentUseCase = new DeleteMyCommentUseCase(deleteComment)

            const getOneCommentUseCase = new GetOneCommentUseCase(getCommentById)

            const comment = await getOneCommentUseCase.execute(commentId)
            
            //validação do comment
            if (comment.props.userId !== userId) {

                throw new Error('Bad Request: you dont have access to delete this comment.')

            }

            const message = await deleteMyCommentUseCase.execute(commentId)

            res.status(200).json(message)
            
        } catch (error) {

            throw new Error('Bad request: ' + error)
            
        }

    }

}

const removeCommentController = new RemoveComment()

export default removeCommentController