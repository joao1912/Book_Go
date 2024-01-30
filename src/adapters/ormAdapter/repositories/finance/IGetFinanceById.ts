import { Finance } from "../../../../entities/Finance";


export interface IGetFinanceById {

    execute(id: string): Promise<Finance>

}