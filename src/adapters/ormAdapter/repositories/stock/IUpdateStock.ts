import { IStock, Stock } from "../../../../entities/Stock"

export interface IUpdateStock {
    execute(stock: Partial<Stock> ): Promise<Stock>
}
