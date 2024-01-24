export interface IFinance {
    payment: number;
    bookId: string;
    userId: string;
    total: number;
}

export class Finance {

    readonly id: string;
    readonly payment: number;
    readonly bookId: string;
    readonly userId: string;
    readonly total: number;

    constructor(id: string ,payment: number, bookId: string, userId: string, total: number) {

        this.id = id
        this.payment = payment
        this.bookId = bookId
        this.userId = userId
        this.total = total

    }

    public getPayment() {
        return this.payment
    }

    public getBookId() {
        return this.bookId
    }

    public getUserId() {
        return this.userId
    }

    public getTotal() {
        return this.total
    }

}