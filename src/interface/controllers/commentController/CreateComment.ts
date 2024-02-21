import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { createComment } from "../../../adapters/ormAdapter/protocols/commentProtocols";
import { IComment } from "../../../entities/Comment";
import { CreateCommentUseCase } from "../../../usecases/comment/CreateCommentUseCase";
import { IController } from "../IController";

interface IBody extends IComment {}

class CreateComment implements IController {

    async handle(req: HttpRequest<{}, {}, IBody>, res: HttpResponse) {

        const commentData = req.body;

        const userId = req.userId;

        if (typeof userId != 'string') throw new Error('Bad Request: userId can not be other type besides string')

        try {
            
            const createCommentUseCase = new CreateCommentUseCase(createComment)

            const newComment = await createCommentUseCase.execute({...commentData, userId})

            res.status(200).json(newComment)

        } catch (error) {

            throw new Error('Bad request: ' + error)
            
        }

    }
    
}

const createCommentController = new CreateComment()

export default createCommentController