import { IStock, Stock } from "../../../../entities/Stock"

export interface IUpdateStock {
    execute(stock: Stock ): Promise<Stock>
}
