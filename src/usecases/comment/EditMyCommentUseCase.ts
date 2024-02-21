import { IUpdateComment } from "../../adapters/ormAdapter/repositories/comment/IUpdateComment";
import { Comment, IComment } from "../../entities/Comment";


export class EditMyCommentUseCase {

    protected updateComment: IUpdateComment

    constructor(ormAdapter: IUpdateComment) {

        this.updateComment = ormAdapter

    }

    async execute(commentData: Partial<Comment>) {

        //tem que arrumar

        return await this.updateComment.execute(commentData)

    }

}