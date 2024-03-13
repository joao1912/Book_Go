import { Router } from "express";
import getAllStockController from "../../controllers/stockController/GetAllStock.js";
import getStockByBookTitleController from "../../controllers/stockController/GetStockByBookTitle.js";
import getStockByQuantityController from "../../controllers/stockController/GetStockByQuantity.js";
import updateStockController from "../../controllers/stockController/UpdateStock.js";
import Auth from "../../middlewares/Auth.js";



const stockRouter = Router()

stockRouter.get("/all", Auth.execute, getAllStockController.handle)

stockRouter.get('/book/:title', Auth.execute, getStockByBookTitleController.handle)

stockRouter.get('/book/quantity/:quantity',Auth.execute, getStockByQuantityController.handle)

stockRouter.put('/update/book/:bookId/', Auth.execute, updateStockController.handle)

export default stockRouter