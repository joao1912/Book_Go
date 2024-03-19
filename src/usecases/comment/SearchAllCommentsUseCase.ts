import { IGetAllComments } from "../../adapters/ormAdapter/repositories/comment/IGetAllComments";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class SearchAllCommentsUseCase {

    protected getAllCommentsAdapter: IGetAllComments;

    constructor(ormAdapter: IGetAllComments) {

        this.getAllCommentsAdapter = ormAdapter

    }

    async execute(bookId: string) {

        const validatedId = validatorAdapter.validateId(bookId)

        return await this.getAllCommentsAdapter.execute(validatedId)
            
    }

}