import { IUpdateComment } from "../../adapters/ormAdapter/repositories/comment/IUpdateComment.js";
import { Comment, IComment } from "../../entities/Comment.js";


export class EditMyCommentUseCase {

    protected updateComment: IUpdateComment

    constructor(ormAdapter: IUpdateComment) {

        this.updateComment = ormAdapter

    }

    async execute(commentData: IComment) {

        const commentInstance = new Comment(commentData)

        return await this.updateComment.execute(commentInstance)

    }

}