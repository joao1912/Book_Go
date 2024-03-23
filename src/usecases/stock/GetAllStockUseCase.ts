import { IGetAllStock } from "../../adapters/ormAdapter/repositories/stock/IGetAllStock"


export class GetAllStockUseCase {

    protected getAllStockService: IGetAllStock

    constructor(ormAdapter: IGetAllStock) {

        this.getAllStockService = ormAdapter
        
    }

    async execute() {

        return await this.getAllStockService.execute()

    }

}
