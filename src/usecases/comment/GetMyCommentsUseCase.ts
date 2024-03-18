import { IGetAllCommentsByUserId } from "../../adapters/ormAdapter/repositories/comment/IGetAllCommentsByUserId"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"


export class GetMyCommentsUseCase {

    protected getAllCommentsAdapter: IGetAllCommentsByUserId

    constructor(ormAdapter: IGetAllCommentsByUserId) {

        this.getAllCommentsAdapter = ormAdapter
            
    }

    async execute(userId: string | undefined) {

        const validatedId = validatorAdapter.validateId(userId)

        const comments = await this.getAllCommentsAdapter.execute(validatedId)

        if (comments == null) {
            return []
        } else {
            return comments
        }

    }

}