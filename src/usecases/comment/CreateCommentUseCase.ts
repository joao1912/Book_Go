import { ICreateComment } from "../../adapters/ormAdapter/repositories/comment/ICreateComment";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";
import { Comment, IComment } from "../../entities/Comment";


export class CreateCommentUseCase {

    protected createCommentAdapter: ICreateComment

    constructor(ormAdapter: ICreateComment) {

        this.createCommentAdapter = ormAdapter

    }

    async execute(commentData: IComment) {

        //const validatedData = validatorAdapter.validateSchema<IComment, typeof bookSchema>(commentData, bookSchema)

        const commentInstance = new Comment(commentData)

        return await this.createCommentAdapter.execute(commentInstance)

    }

}