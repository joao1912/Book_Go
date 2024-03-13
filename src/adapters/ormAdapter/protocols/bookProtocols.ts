import { AddBook } from "../prismaAdapter/book/AddBook.js";
import { DeleteAllBooks } from "../prismaAdapter/book/DeleteAllBooks.js";
import { DeleteBook } from "../prismaAdapter/book/DeleteBook.js";
import { GetAllBooks } from "../prismaAdapter/book/GetAllBooks.js";
import { SearchBookByGenre } from "../prismaAdapter/book/SearchBookByGenre.js";
import { SearchBookById } from "../prismaAdapter/book/SearchBookById.js";
import { SearchBookByTitle } from "../prismaAdapter/book/SearchBookByTitle.js";
import { UpdateBook } from "../prismaAdapter/book/UpdateBook.js";


export const addBook = new AddBook()

export const deleteBook = new DeleteBook()

export const searchBookById = new SearchBookById()

export const searchBookByGenre = new SearchBookByGenre()

export const searchBookByTitle = new SearchBookByTitle()

export const updateBook = new UpdateBook()

export const getAllBooks = new GetAllBooks()

export const deleteAllBooks = new DeleteAllBooks()