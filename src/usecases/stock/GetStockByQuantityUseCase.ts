import { IGetStockByQuantity } from "../../adapters/ormAdapter/repositories/stock/IGetStockByQuantity"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"


export class GetStockByQuantityUseCase {

    protected stockService: IGetStockByQuantity
    constructor(ormAdapter: IGetStockByQuantity) {
        this.stockService = ormAdapter
    }

    async execute(quantity: number | undefined) {

        if (!quantity) ServerResponse.badRequest('StockError', 'quantidade precisa ser um numero')

        return await this.stockService.execute(quantity)

    }

}

