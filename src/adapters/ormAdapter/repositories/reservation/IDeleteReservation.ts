
export interface IDeleteMessage {
    message: string
}

export interface IDeleteReservation {
    execute(userId: string, bookId:string): Promise<IDeleteMessage>
}