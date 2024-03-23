import { getCommentById } from "../../adapters/ormAdapter/protocols/commentProtocols";
import { IDeleteComment } from "../../adapters/ormAdapter/repositories/comment/IDeleteComment";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";
import ServerResponse from "../../interface/controllers/utils/ServerResponse";
import { GetOneCommentUseCase } from "./GetOneCommentUseCase";


export class DeleteMyCommentUseCase {

    protected deleteCommentService: IDeleteComment;

    constructor(ormAdapter: IDeleteComment) {

        this.deleteCommentService = ormAdapter

    }

    async execute(commentId: string | undefined, userId: string | undefined) {

        const getOneCommentUseCase = new GetOneCommentUseCase(getCommentById)

        const validatedCommentId = validatorAdapter.validateId(commentId)
        const validateduserId = validatorAdapter.validateId(userId)

        const comment = await getOneCommentUseCase.execute(validatedCommentId)

        if (comment.props.userId !== validateduserId) {

            ServerResponse.notAuthorized('CommentError', 'You dont have access to delete this comment.')

        }

        return await this.deleteCommentService.execute(validatedCommentId)

    }

}
