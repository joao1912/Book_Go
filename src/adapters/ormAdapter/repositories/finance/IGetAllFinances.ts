import { IBook } from "../../../../entities/Book";
import { typeOfPayment } from "./ICreateFinance";

export interface IAllFinance {

    id: string;
    payment: typeOfPayment;
    total: number;
    book: IBook,
    userId: string

}

export interface IGetAllFinances {

    execute(): Promise<IAllFinance[] | void>

}