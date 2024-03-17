
export interface IDeleteMessageBook {
    message: string
}

export interface IDeleteBook {
    execute(id: String ): Promise<IDeleteMessageBook>
}
