import { IGetAllStock } from "../../adapters/ormAdapter/repositories/stock/IGetAllStock"


export class GetAllStockUseCase {

    protected stockService: IGetAllStock
    constructor(ormAdapter: IGetAllStock) {
        this.stockService = ormAdapter
    }

    async execute() {

        return await this.stockService.execute()

    }

}

