import {IBook } from "../../../../entities/Book"

export interface IUpdateBook {
    execute(book: Partial<IBook> ): Promise<Partial<IBook>>
}
