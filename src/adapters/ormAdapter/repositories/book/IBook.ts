import { Book, IBook } from "../../../../entities/Book"


export interface IBookReposity {
    IAddBook?(book: Book): Promise<Book | void>
    IGetAllBooks?(): Promise <Book[] | void>
    ISearchBookByGenre? (genre: string): Promise<Book[] | string | void>
    ISearchBookById? (id: string): Promise<Book | string | void>
    ISearchBookByTitle? (title: string): Promise<Book[] | string |void>
    IDeleteAllBooks?(): Promise<void>
    IDeleteBook?(id: String ): Promise<IDeleteMessageBook | void>
    IUpdateBook? (book: Book ): Promise<Book | void>


}

export interface IDeleteMessageBook {
    message: string
}



