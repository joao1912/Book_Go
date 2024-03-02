import { Book, IBook} from "../../../../entities/Book";


export interface ISearchBookByTitle {
    execute(title: string): Promise<Book[] | string>

}