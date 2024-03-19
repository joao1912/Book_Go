import { IGetStockByBookTitle } from "../../adapters/ormAdapter/repositories/stock/IGetStockByBookTitle"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"


export class GetStockByBookTitleUseCase {

    protected stockService: IGetStockByBookTitle
    constructor(ormAdapter: IGetStockByBookTitle) {
        this.stockService = ormAdapter
    }

    async execute(title: string | undefined) {

        if (!title) ServerResponse.badRequest('StockError', 'O titulo precisa está vazio')

        return await this.stockService.execute(title)

    }

}

