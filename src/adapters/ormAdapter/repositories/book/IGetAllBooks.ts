import { IBook, Book } from "../../../../entities/Book";

export interface IGetAllBooks {
    execute(): Promise <Book[]>
}