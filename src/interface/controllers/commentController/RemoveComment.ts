import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { deleteComment } from "../../../adapters/ormAdapter/protocols/commentProtocols";
import { DeleteMyCommentUseCase } from "../../../usecases/comment/DeleteMyCommentUseCase";
import { IController } from "../IController";
import ServerResponse from "../utils/ServerResponse";

interface IParams {
    commentId: string;
}


class RemoveComment implements IController {

    async handle(req: HttpRequest<IParams>, res: HttpResponse) {

        const serverResponse = new ServerResponse(res)

        const commentId = req.params.commentId;
        const userId = req.userId

        const deleteMyCommentUseCase = new DeleteMyCommentUseCase(deleteComment)

        const message = await deleteMyCommentUseCase.execute(commentId, userId)

        return serverResponse.ok(message)

    }

}

const removeCommentController = new RemoveComment()

export default removeCommentController