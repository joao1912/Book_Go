import { ICreateComment } from "../../adapters/ormAdapter/repositories/comment/ICreateComment.js";
import { Comment, IComment } from "../../entities/Comment.js";


export class CreateCommentUseCase {

    protected createCommentAdapter: ICreateComment

    constructor(ormAdapter: ICreateComment) {

        this.createCommentAdapter = ormAdapter

    }

    async execute(commentData: IComment) {

        const commentInstance = new Comment(commentData)

        return await this.createCommentAdapter.execute(commentInstance)

    }

}