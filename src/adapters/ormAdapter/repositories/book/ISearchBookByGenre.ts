import { Book, IBook} from "../../../../entities/Book";


export interface ISearchBookByGenre {
    execute(genre: string): Promise<Book[] | string>

}