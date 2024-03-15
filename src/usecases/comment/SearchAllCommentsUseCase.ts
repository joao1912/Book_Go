import { IGetAllComments } from "../../adapters/ormAdapter/repositories/comment/IGetAllComments";


export class SearchAllCommentsUseCase {

    protected getAllCommentsAdapter: IGetAllComments;

    constructor(ormAdapter: IGetAllComments) {

        this.getAllCommentsAdapter = ormAdapter

    }

    async execute(bookId: string) {

        return await this.getAllCommentsAdapter.execute(bookId)
            
    }

}