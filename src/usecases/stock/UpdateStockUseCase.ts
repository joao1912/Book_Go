import { IUpdateStock } from "../../adapters/ormAdapter/repositories/stock/IUpdateStock"
import { IStock } from "../../entities/Stock"


export class UpdateStockUseCase {

    protected stockService: IUpdateStock
    constructor(ormAdapter: IUpdateStock) {
        this.stockService = ormAdapter
    }

    async execute(stockData: Partial<IStock>) {

       return await this.stockService.execute(stockData)

    

    }

}
