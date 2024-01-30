import { Finance, IFinance } from "../../../../entities/Finance";

export enum typeOfPayment {

    Ticket = "Ticket",
    CreditCard = "Credit card",
    DebitCard = "Debit card",
    Pix = "Pix"
}

export interface ICreateFinance {

    execute(financeData: Omit<IFinance, 'id'>): Promise<Finance>

}