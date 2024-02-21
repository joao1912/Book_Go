import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { updateComment } from "../../../adapters/ormAdapter/protocols/commentProtocols";
import { IComment } from "../../../entities/Comment";
import { EditMyCommentUseCase } from "../../../usecases/comment/EditMyCommentUseCase";
import { IController } from "../IController";

interface IBody extends IComment {}

class UpdateComment implements IController {

    async handle(req: HttpRequest<{}, {}, Partial<IBody>>, res: HttpResponse) {
        
        const commentData = req.body;

        const userId = req.userId;

        if (!userId) throw new Error('Bad Request: userId can not be undefined')

        try {
            
            const editMyCommentUseCase = new EditMyCommentUseCase(updateComment)

            //const commentUpdated = await editMyCommentUseCase.execute()

            //res.status(200).json(commentUpdated)

        } catch (error) {

            throw new Error('Bad request: ' + error)
            
        }

    }
    
}

const updateCommentController = new UpdateComment()

export default updateCommentController