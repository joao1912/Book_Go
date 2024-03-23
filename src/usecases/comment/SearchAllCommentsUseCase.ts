import { IGetAllComments } from "../../adapters/ormAdapter/repositories/comment/IGetAllComments";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class SearchAllCommentsUseCase {

    protected getAllCommentsService: IGetAllComments;

    constructor(ormAdapter: IGetAllComments) {

        this.getAllCommentsService = ormAdapter

    }

    async execute(bookId: string) {

        const validatedId = validatorAdapter.validateId(bookId)

        return await this.getAllCommentsService.execute(validatedId)
            
    }

}
