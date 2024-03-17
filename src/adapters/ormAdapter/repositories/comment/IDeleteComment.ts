
export interface IDeleteMessage {
    message: string
}

export interface IDeleteComment {

    execute(id: string): Promise<IDeleteMessage>

}