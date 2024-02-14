import { IUpdateComment } from "../../adapters/ormAdapter/repositories/comment/IUpdateComment";
import { Comment } from "../../entities/Comment";


export class EditMyCommentUseCase {

    protected updateComment: IUpdateComment

    constructor(ormAdapter: IUpdateComment) {

        this.updateComment = ormAdapter

    }

    async execute(commentData: Comment) {

        return await this.updateComment.execute(commentData)

    }

}