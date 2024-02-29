



export interface IReservation {
    id?: string;
    userId: string;
    bookId: string;
    price: number;
    status : string
    startedAt? : Date
    endsAt? : Date
}

export class Reservation {
    readonly props: IReservation

    constructor(props: IReservation) {
        const {id, userId, bookId, price} = props

        this.props = props
    }
     
}