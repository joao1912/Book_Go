export interface IReservation {
    id: string;
    userId: string;
    bookId: string;
    price: number;
}

export class Reservation {
    readonly id: string;
    readonly userId: string;
    readonly bookId: string;
    readonly price: number;

    constructor(id: string, userId: string, bookId: string, price: number) {
        this.id = id
        this.userId = userId
        this.bookId = bookId
        this.price = price
    }

    getId() {
        return this.id
    }

    getUserId() {
        return this.userId
    }

    getBookId() {
        return this.bookId
    }

    getPrice() {
        return this.price
    }
     
}