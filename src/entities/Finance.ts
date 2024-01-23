

export class Finance {

    readonly payment: number;
    readonly bookId: string;
    readonly userId: string;
    readonly total: number;

    constructor(payment: number, bookId: string, userId: string, total: number) {

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