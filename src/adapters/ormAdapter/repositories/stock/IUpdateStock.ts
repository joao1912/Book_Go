import { IStock } from "../../../../entities/Stock"

export interface IUpdateStock {
    execute(stock: Partial<IStock> ): Promise<Partial<IStock>>
}
