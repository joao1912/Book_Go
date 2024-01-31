export interface IDeleteMessage {
    message: 'O livro foi removido dos favoritos'
}

export interface IDeleteFavorite {

    execute(userId: string, bookId: string): Promise<IDeleteMessage>

}