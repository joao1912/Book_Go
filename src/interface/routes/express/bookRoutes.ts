import { Router } from "express";
import getAllBooksController from "../../controllers/bookController/GetAllBooks";
import addBookController from "../../controllers/bookController/AddBook";
import searchBookByGenreController from "../../controllers/bookController/SearchBookByGenre";


const bookRouter = Router()

bookRouter.get('/', getAllBooksController.handle)

bookRouter.post('/addbook', addBookController.handle)

bookRouter.post('/searchbygenre', searchBookByGenreController.handle)




export default bookRouter;