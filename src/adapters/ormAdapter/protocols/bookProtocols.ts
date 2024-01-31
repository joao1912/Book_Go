import { AddBook } from "../prismaAdapter/book/AddBook";
import { DeleteBook } from "../prismaAdapter/book/DeleteBook";
import { SearchBookByGenre } from "../prismaAdapter/book/SearchBookByGenre";
import { SearchBookByTitle } from "../prismaAdapter/book/SearchBookByTitle";
import { UpdateBook } from "../prismaAdapter/book/UpdateBook";


export const addBook = new AddBook()

export const deleteBook = new DeleteBook()

export const searchBookByGenre = new SearchBookByGenre()

export const searchBookByTitle = new SearchBookByTitle()

export const updateBook = new UpdateBook()