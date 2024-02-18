import { Router } from "express";
import getAllStockController from "../../controllers/stockController/GetAllStock";
import getStockByBookTitleController from "../../controllers/stockController/GetStockByBookTitle";
import getStockByQuantityController from "../../controllers/stockController/GetStockByQuantity";
import updateStockController from "../../controllers/stockController/UpdateStock";



const stockRouter = Router()

stockRouter.get("/", getAllStockController.handle)

stockRouter.get('/book/:title', getStockByBookTitleController.handle)

stockRouter.get('/book/quantity/:quantity', getStockByQuantityController.handle)

stockRouter.put('/update/book/:book_Id/', updateStockController.handle)

export default stockRouter