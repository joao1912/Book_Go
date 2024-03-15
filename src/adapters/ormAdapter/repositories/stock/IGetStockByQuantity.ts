import { Stock } from "../../../../entities/Stock";


export interface IGetStockByQuantity {
    execute(quantity: number): Promise<Stock[] | string | void>

}