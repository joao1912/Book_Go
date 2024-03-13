import { Router } from "express";
import getAllBooksController from "../../controllers/bookController/GetAllBooks.js";
import addBookController from "../../controllers/bookController/AddBook.js";
import searchBookByGenreController from "../../controllers/bookController/SearchBookByGenre.js";
import searchBookByTitleController from "../../controllers/bookController/SearchBookByTitle.js";
import updateBookController from "../../controllers/bookController/UpdateBook.js";
import deleteBookController from "../../controllers/bookController/DeleteBook.js";
import Auth from "../../middlewares/Auth.js";


const bookRouter = Router()

bookRouter.get('/', getAllBooksController.handle)

bookRouter.post('/add', Auth.execute, addBookController.handle)

bookRouter.post('/genre', searchBookByGenreController.handle)

bookRouter.post('/title', searchBookByTitleController.handle)

bookRouter.put('/update/:id', Auth.execute, updateBookController.handle)

bookRouter.delete('/delete/:id', Auth.execute, deleteBookController.handle)



export default bookRouter;