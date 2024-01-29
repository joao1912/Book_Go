
export interface IDeleteMessage {
    message: string
}

export interface IDeleteBook {
    execute(id: String ): Promise<IDeleteMessage>
}
