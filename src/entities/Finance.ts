import { typeOfPayment, typeOfPaymentSchema } from "../adapters/ormAdapter/repositories/finance/ICreateFinance";
import { ZodType, z } from "zod"


export interface IFinance {
    id?: string;
    payment: typeOfPayment;
    bookId: string;
    userId: string;
    total: number;
}

export const financeSchema = z.object({
    id: z.string().optional(),
    payment: typeOfPaymentSchema,
    bookId: z.string(),
    userId: z.string(),
    total: z.number()
}) satisfies ZodType<IFinance>

export class Finance {

    readonly props: IFinance

    constructor(props: IFinance) {

        const { id, bookId, payment, total, userId } = props

        this.props = props

    }

    getId() {
        return this.props.id
    }

    public getPayment() {
        return this.props.payment
    }

    public getBookId() {
        return this.props.bookId
    }

    public getUserId() {
        return this.props.userId
    }

    public getTotal() {
        return this.props.total
    }

}