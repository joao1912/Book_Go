import { IGetStockByQuantity } from "../../adapters/ormAdapter/repositories/stock/IGetStockByQuantity.js"


export class GetStockByQuantityUseCase {

    protected stockService: IGetStockByQuantity
    constructor(ormAdapter: IGetStockByQuantity) {
        this.stockService = ormAdapter
    }

    async execute(quantity: number) {

        return await this.stockService.execute(quantity)

    }

}

