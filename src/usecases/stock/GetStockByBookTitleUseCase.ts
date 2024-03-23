import { IGetStockByBookTitle } from "../../adapters/ormAdapter/repositories/stock/IGetStockByBookTitle"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"


export class GetStockByBookTitleUseCase {

    protected getStockByBookTitleService: IGetStockByBookTitle

    constructor(ormAdapter: IGetStockByBookTitle) {

        this.getStockByBookTitleService = ormAdapter
        
    }

    async execute(title: string | undefined) {

        if (!title) ServerResponse.badRequest('StockError', 'This title needs to be valid.')

        return await this.getStockByBookTitleService.execute(title)

    }

}
