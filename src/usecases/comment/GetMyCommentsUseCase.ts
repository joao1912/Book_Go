import { IGetAllCommentsByUserId } from "../../adapters/ormAdapter/repositories/comment/IGetAllCommentsByUserId.js"


export class GetMyCommentsUseCase {

    protected getAllCommentsAdapter: IGetAllCommentsByUserId

    constructor(ormAdapter: IGetAllCommentsByUserId) {

        this.getAllCommentsAdapter = ormAdapter
            
    }

    async execute(userId: string) {

        const comments = await this.getAllCommentsAdapter.execute(userId)

        if (comments == null) {
            return []
        } else {
            return comments
        }

    }

}