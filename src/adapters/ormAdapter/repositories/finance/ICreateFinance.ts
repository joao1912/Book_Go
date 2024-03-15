import { Finance, IFinance } from "../../../../entities/Finance";

export enum typeOfPayment {

    Ticket = "Ticket",
    CreditCard = "Credit card",
    DebitCard = "Debit card",
    Pix = "Pix"
}

export interface IRegister {
    id?: string;
    author: string;
    email: string;
    telephone: string;
    payment: string;
    total: number;
    title: string;
}

export interface ICreateFinance {

    execute(financeData: Omit<Finance, 'id'>): Promise<Finance | void>

    insertIntoRegister(data: IRegister): Promise<void>

}