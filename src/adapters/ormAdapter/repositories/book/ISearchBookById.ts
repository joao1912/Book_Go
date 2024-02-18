import { Book, IBook} from "../../../../entities/Book";


export interface ISearchBookById {
    execute(id: string): Promise<Book | string >

}