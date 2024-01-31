import { IUpdateStock } from "../../adapters/ormAdapter/repositories/stock/IUpdateStock"
import { IStock } from "../../entities/Stock"


export class Updatestock {

    protected stockService: IUpdateStock
    constructor(ormAdapter: IUpdateStock) {
        this.stockService = ormAdapter
    }

    async execute(stockData: Partial<IStock>) {

        const stock = await this.stockService.execute(stockData)

    

    }

}
