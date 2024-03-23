import { Router } from "express";

import getAllBooksController from "../../controllers/bookController/GetAllBooks";
import addBookController from "../../controllers/bookController/AddBook";
import searchBookByGenreController from "../../controllers/bookController/SearchBookByGenre";
import searchBookByTitleController from "../../controllers/bookController/SearchBookByTitle";
import updateBookController from "../../controllers/bookController/UpdateBook";
import deleteBookController from "../../controllers/bookController/DeleteBook";

import Auth from "../../middlewares/Auth";


const bookRouter = Router()

bookRouter.get('/', getAllBooksController.handle)

bookRouter.post('/add', Auth.execute, addBookController.handle)

bookRouter.get('/genre', searchBookByGenreController.handle)

bookRouter.get('/title', searchBookByTitleController.handle)

bookRouter.put('/update/:id', Auth.execute, updateBookController.handle)

bookRouter.delete('/delete/:id', Auth.execute, deleteBookController.handle)


export default bookRouter;