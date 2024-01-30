import { IStock } from "../../../../entities/Stock";


export interface IGetStockByBookTitle {
    execute(book: string): Promise< IStock | IStock[]>

}