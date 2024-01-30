import { IStock } from "../../../../entities/Stock"

export interface IGetAllStock {
    execute(): Promise< IStock | IStock[]>
}
