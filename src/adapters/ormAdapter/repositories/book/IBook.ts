import { Book, IBook } from "../../../../entities/Book"


export interface IBookReposity {
    IAddBook?(book: Book): Promise<Book>
    IGetAllBooks?(): Promise <Book[] >
    ISearchBookByGenre? (genre: string): Promise<Book[] | string>
    ISearchBookById? (id: string): Promise<Book | string >
    ISearchBookByTitle? (title: string): Promise<Book[] | string >
    IDeleteAllBooks?(): Promise<void>
    IDeleteBook?(id: String ): Promise<IDeleteMessageBook >
    IUpdateBook? (book: Book ): Promise<Book >
    FindManyByInput(input: object): Promise <Book[]>


}

export interface IDeleteMessageBook {
    message: string
}



