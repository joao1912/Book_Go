import { HttpRequest, HttpResponse } from "../../../adapters/HTTPAdapter/protocol";
import { getAllCommentsByUserId } from "../../../adapters/ormAdapter/protocols/commentProtocols";
import { GetMyCommentsUseCase } from "../../../usecases/comment/GetMyCommentsUseCase";
import { IController } from "../IController";


class GetMyComments implements IController {

    async handle(req: HttpRequest, res: HttpResponse) {

        const userId = req.userId

        if (!userId) throw new Error('Bad Request: userId can not be undefined')

        const getMycommentsUseCase = new GetMyCommentsUseCase(getAllCommentsByUserId)

        try {
            
            const comments = await getMycommentsUseCase.execute(userId)

            res.status(200).json(comments)

        } catch (error) {

            throw new Error('Bad Request: ' + error)
            
        }

    }

}

const getMycommentsController = new GetMyComments()

export default getMycommentsController