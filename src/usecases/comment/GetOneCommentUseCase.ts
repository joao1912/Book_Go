import { IGetCommentById } from "../../adapters/ormAdapter/repositories/comment/IGetCommentById"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"


export class GetOneCommentUseCase {

    protected getOneCommentService: IGetCommentById

    constructor(ormAdapter: IGetCommentById) {

        this.getOneCommentService = ormAdapter
            
    }

    async execute(commentId: string | undefined) {

        const validatedId = validatorAdapter.validateId(commentId)

        const comment = await this.getOneCommentService.execute(validatedId)
            
        return comment
        

    }

}
