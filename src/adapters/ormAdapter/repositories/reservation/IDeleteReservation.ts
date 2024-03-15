
export interface IDeleteMessage {
    message: string
}

export interface IDeleteReservation {
    execute(reservationId: string): Promise<IDeleteMessage | void>
}