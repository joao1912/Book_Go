import { IBook} from "../../../../entities/Book";


export interface ISearchBookByTitle {
    execute(title: string): Promise< IBook | IBook[]>

}