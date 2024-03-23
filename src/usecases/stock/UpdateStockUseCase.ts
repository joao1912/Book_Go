import { IUpdateStock } from "../../adapters/ormAdapter/repositories/stock/IUpdateStock"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"
import { SchemaKey } from "../../adapters/validatorAdapter/repository/IValidatorAdapterRepository"
import { IStock, Stock } from "../../entities/Stock"


export class UpdateStockUseCase {

    protected updateStockService: IUpdateStock

    constructor(ormAdapter: IUpdateStock) {

        this.updateStockService = ormAdapter

    }

    async execute(stockData: IStock) {

        const validatedData = validatorAdapter.validateSchema<IStock>(stockData, SchemaKey.stock)

        const stockInstance = new Stock(validatedData)

        return await this.updateStockService.execute(stockInstance)

    }
}
