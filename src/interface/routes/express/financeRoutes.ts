import { Router } from "express";
import Auth from "../../middlewares/Auth.js";
import getAllFinanceController from "../../controllers/financeController/GetAllFinance.js";

const financeRouter = Router()

financeRouter.get('/', Auth.execute, getAllFinanceController.handle)

export default financeRouter

//tem que ter o id do adm