import { Router } from "express";
import getAllStockController from "../../controllers/stockController/GetAllStock";
import getStockByBookTitleController from "../../controllers/stockController/GetStockByBookTitle";
import getStockByQuantityController from "../../controllers/stockController/GetStockByQuantity";
import updateStockController from "../../controllers/stockController/UpdateStock";
import Auth from "../../middlewares/Auth";



const stockRouter = Router()

stockRouter.get("/all", Auth.execute, getAllStockController.handle)

stockRouter.get('/book/:title', Auth.execute, getStockByBookTitleController.handle)

stockRouter.get('/book/quantity/:quantity',Auth.execute, getStockByQuantityController.handle)

stockRouter.put('/update/book/:book_Id/', Auth.execute, updateStockController.handle)

export default stockRouter