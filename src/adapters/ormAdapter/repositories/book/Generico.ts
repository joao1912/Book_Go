import { IBook } from "../../../../entities/Book"

export interface BookRepository implements Ibook {
    getBookByTitle: (title: string) :(Promise: <IBook>) 
}