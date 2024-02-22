import { Router } from "express";
import Auth from "../../middlewares/Auth";
import getAllFinanceController from "../../controllers/financeController/GetAllFinance";

const financeRouter = Router()

financeRouter.get('/', getAllFinanceController.handle)

//tem que ter o id do adm