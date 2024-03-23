import { Router } from "express";

import getAllFinanceController from "../../controllers/financeController/GetAllFinance";

import Auth from "../../middlewares/Auth";


const financeRouter = Router()

financeRouter.get('/', Auth.execute, getAllFinanceController.handle)


export default financeRouter