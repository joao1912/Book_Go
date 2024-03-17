import { Finance, IFinance } from "../../../../entities/Finance";

export interface IUpdateFinance {

    execute(financeToBeUpdated: Partial<Finance>): Promise<Partial<Finance>>

}