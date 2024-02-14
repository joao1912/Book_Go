import { AddBook } from "../prismaAdapter/book/AddBook";
import { DeleteAllBooks } from "../prismaAdapter/book/DeleteAllBooks";
import { DeleteBook } from "../prismaAdapter/book/DeleteBook";
import { GetAllBooks } from "../prismaAdapter/book/GetAllBooks";
import { SearchBookByGenre } from "../prismaAdapter/book/SearchBookByGenre";
import { SearchBookByTitle } from "../prismaAdapter/book/SearchBookByTitle";
import { UpdateBook } from "../prismaAdapter/book/UpdateBook";


export const addBook = new AddBook()

export const deleteBook = new DeleteBook()

export const searchBookByGenre = new SearchBookByGenre()

export const searchBookByTitle = new SearchBookByTitle()

export const updateBook = new UpdateBook()

export const getAllBooks = new GetAllBooks()

export const deleteAllBooks = new DeleteAllBooks()