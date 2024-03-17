import { getCommentById } from "../../adapters/ormAdapter/protocols/commentProtocols";
import { IDeleteComment } from "../../adapters/ormAdapter/repositories/comment/IDeleteComment";
import ServerResponse from "../../interface/controllers/utils/ServerResponse";
import { GetOneCommentUseCase } from "./GetOneCommentUseCase";



export class DeleteMyCommentUseCase {

    protected deleteComment: IDeleteComment;

    constructor(ormAdapter: IDeleteComment) {

        this.deleteComment = ormAdapter

    }

    async execute(commentId: string, userId: string) {

        const getOneCommentUseCase = new GetOneCommentUseCase(getCommentById)

        const comment = await getOneCommentUseCase.execute(commentId)

        if (comment.props.userId !== userId) {

            ServerResponse.notAuthorized('CommentError', 'Bad Request: you dont have access to delete this comment.')

        }

        return await this.deleteComment.execute(commentId)

    }

}