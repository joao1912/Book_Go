import { IGetCommentById } from "../../adapters/ormAdapter/repositories/comment/IGetCommentById"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"



export class GetOneCommentUseCase {

    protected getOneCommentAdapter: IGetCommentById

    constructor(ormAdapter: IGetCommentById) {

        this.getOneCommentAdapter = ormAdapter
            
    }

    async execute(commentId: string | undefined) {

        const validatedId = validatorAdapter.validateId(commentId)

        const comment = await this.getOneCommentAdapter.execute(validatedId)

        if (!comment) throw new Error('Bad Request: this comment dont exists.')
            
        return comment
        

    }

}