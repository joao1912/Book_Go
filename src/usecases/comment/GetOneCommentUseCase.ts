import { IGetCommentById } from "../../adapters/ormAdapter/repositories/comment/IGetCommentById"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"



export class GetOneCommentUseCase {

    protected getOneCommentAdapter: IGetCommentById

    constructor(ormAdapter: IGetCommentById) {

        this.getOneCommentAdapter = ormAdapter
            
    }

    async execute(commentId: string | undefined) {

        const validatedId = validatorAdapter.validateId(commentId)

        const comment = await this.getOneCommentAdapter.execute(validatedId)

        if (!comment) ServerResponse.notFound('CommentError', 'this comment dont exists.')
            
        return comment
        

    }

}