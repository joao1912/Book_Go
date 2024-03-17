export interface IDeleteMessage {
    message: 'O livro foi removido dos favoritos'
}

export interface IDeleteFavorite {

    execute(id: string): Promise<IDeleteMessage>

}