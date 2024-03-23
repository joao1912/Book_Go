import { IUpdateComment } from "../../adapters/ormAdapter/repositories/comment/IUpdateComment";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";
import { SchemaKey } from "../../adapters/validatorAdapter/repository/IValidatorAdapterRepository";
import { Comment, IComment } from "../../entities/Comment";


export class EditMyCommentUseCase {

    protected updateCommentService: IUpdateComment

    constructor(ormAdapter: IUpdateComment) {

        this.updateCommentService = ormAdapter

    }

    async execute(commentData: IComment) {

        const validatedData = validatorAdapter.validateSchema<IComment>(commentData, SchemaKey.comment)

        const commentInstance = new Comment(validatedData)

        return await this.updateCommentService.execute(commentInstance)

    }

}
