import { typeOfPayment } from "../adapters/ormAdapter/repositories/finance/ICreateFinance";

export interface IFinance {
    id?: string;
    payment: typeOfPayment;
    bookId: string;
    userId: string;
    total: number;
}

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