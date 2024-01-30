import { IStock } from "../../../../entities/Stock";


export interface IGetStockByQuantity {
    execute(quantity: number): Promise< IStock | IStock[]>

}