import { IGetStockByQuantity } from "../../adapters/ormAdapter/repositories/stock/IGetStockByQuantity"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"


export class GetStockByQuantityUseCase {

    protected getStockByQuantityService: IGetStockByQuantity

    constructor(ormAdapter: IGetStockByQuantity) {

        this.getStockByQuantityService = ormAdapter

    }

    async execute(quantity: number | undefined) {

        if (!quantity) ServerResponse.badRequest('StockError', 'Quantity needs to be a number.')

        return await this.getStockByQuantityService.execute(quantity)

    }

}
