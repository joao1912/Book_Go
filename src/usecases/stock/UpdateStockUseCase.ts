import { IUpdateStock } from "../../adapters/ormAdapter/repositories/stock/IUpdateStock.js"
import { IStock, Stock } from "../../entities/Stock.js"


export class UpdateStockUseCase {

    protected stockService: IUpdateStock
    constructor(ormAdapter: IUpdateStock) {
        this.stockService = ormAdapter
    }

    async execute(stockData: IStock) {

    const stockInstance = new Stock(stockData)
       return await this.stockService.execute(stockInstance)

    

    }

}
