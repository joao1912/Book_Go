import { IGetCommentById } from "../../adapters/ormAdapter/repositories/comment/IGetCommentById"



export class GetOneCommentUseCase {

    protected getOneCommentAdapter: IGetCommentById

    constructor(ormAdapter: IGetCommentById) {

        this.getOneCommentAdapter = ormAdapter
            
    }

    async execute(commentId: string) {

        const comment = await this.getOneCommentAdapter.execute(commentId)

        if (!comment) throw new Error('Bad Request: this comment dont exists.')
            
        return comment
        

    }

}