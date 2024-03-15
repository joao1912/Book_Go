export interface IDeleteMessage {
    message: 'Author deletado com sucesso!'
}

export interface IDeleteAuthor {

    execute(id: string): Promise<IDeleteMessage | void>

}