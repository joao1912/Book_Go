export interface IDeleteMessage {
    message: string
}

export interface IDeleteUser {
    execute(id: String): Promise<IDeleteMessage>
}