import { IStock, Stock } from "../../../../entities/Stock"

export interface IUpdateStock {
    execute(stock: Partial<IStock> ): Promise<Stock>
}
