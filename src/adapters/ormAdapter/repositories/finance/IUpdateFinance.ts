import { Finance, IFinance } from "../../../../entities/Finance";

export interface IUpdateFinance {

    execute(financeToBeUpdated: Partial<IFinance>): Promise<Partial<Finance>>

}