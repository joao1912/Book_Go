import { Stock } from "../../../../entities/Stock";


export interface IGetStockByBookTitle {
    execute(book: string): Promise<Stock[]>

}