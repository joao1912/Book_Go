import { IGetStockByBookTitle } from "../../adapters/ormAdapter/repositories/stock/IGetStockByBookTitle.js"


export class GetStockByBookTitleUseCase {

    protected stockService: IGetStockByBookTitle
    constructor(ormAdapter: IGetStockByBookTitle) {
        this.stockService = ormAdapter
    }

    async execute(title: string) {

        return await this.stockService.execute(title)

    }

}

