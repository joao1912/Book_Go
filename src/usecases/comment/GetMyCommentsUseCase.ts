import { IGetAllCommentsByUserId } from "../../adapters/ormAdapter/repositories/comment/IGetAllCommentsByUserId"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"


export class GetMyCommentsUseCase {

    protected getAllCommentsService: IGetAllCommentsByUserId

    constructor(ormAdapter: IGetAllCommentsByUserId) {

        this.getAllCommentsService = ormAdapter
            
    }

    async execute(userId: string | undefined) {

        const validatedId = validatorAdapter.validateId(userId)

        const comments = await this.getAllCommentsService.execute(validatedId)

        if (comments == null) {
            return []
        } else {
            return comments
        }

    }

}
