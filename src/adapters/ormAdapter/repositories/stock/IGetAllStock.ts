import { Stock } from "../../../../entities/Stock"

export interface IGetAllStock {
    execute(): Promise<Stock[]>
}
