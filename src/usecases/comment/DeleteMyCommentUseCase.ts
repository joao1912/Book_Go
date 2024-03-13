import { IDeleteComment } from "../../adapters/ormAdapter/repositories/comment/IDeleteComment.js";



export class DeleteMyCommentUseCase {

    protected deleteComment: IDeleteComment;

    constructor(ormAdapter: IDeleteComment) {

        this.deleteComment = ormAdapter

    }

    async execute(commentId: string) {

        return await this.deleteComment.execute(commentId)

    }

}