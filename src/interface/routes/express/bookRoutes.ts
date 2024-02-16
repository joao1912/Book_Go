import { Router } from "express";
import getAllBooksController from "../../controllers/bookController/GetAllBooks";
import addBookController from "../../controllers/bookController/AddBook";
import searchBookByGenreController from "../../controllers/bookController/SearchBookByGenre";
import searchBookByTitleController from "../../controllers/bookController/SearchBookByTitle";
import updateBookController from "../../controllers/bookController/UpdateBook";
import deleteBookController from "../../controllers/bookController/DeleteBook";


const bookRouter = Router()

bookRouter.get('/', getAllBooksController.handle)

bookRouter.post('/add', addBookController.handle)

bookRouter.post('/searchbygenre', searchBookByGenreController.handle)

bookRouter.post('/searchbytitle', searchBookByTitleController.handle)

bookRouter.put('/update/:id', updateBookController.handle)

bookRouter.delete('/delete/:id', deleteBookController.handle)



export default bookRouter;