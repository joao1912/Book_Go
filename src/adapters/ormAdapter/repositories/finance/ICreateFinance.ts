import { Finance, IFinance } from "../../../../entities/Finance";
import { ZodType, z } from "zod"

export enum typeOfPayment {

    Ticket = "Ticket",
    CreditCard = "Credit card",
    DebitCard = "Debit card",
    Pix = "Pix"
}

export const typeOfPaymentSchema = z.nativeEnum(typeOfPayment)


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

    execute(financeData: Omit<Finance, 'id'>): Promise<Finance>

    insertIntoRegister(data: IRegister): Promise<void>

}