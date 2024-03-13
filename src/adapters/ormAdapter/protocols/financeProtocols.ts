import { CreateFinance } from "../prismaAdapter/finance/CreateFinance.js";
import { DeleteAllFinances } from "../prismaAdapter/finance/DeleteAllFinances.js";
import { DeleteFinance } from "../prismaAdapter/finance/DeleteFinance.js";
import { GetAllFinances } from "../prismaAdapter/finance/GetAllFinances.js";
import { GetFinanceById } from "../prismaAdapter/finance/GetFinanceById.js";
import { UpdateFinance } from "../prismaAdapter/finance/UpdateFinance.js";


export const createFinance = new CreateFinance()

export const deleteAllFinances = new DeleteAllFinances()

export const deleteFinance = new DeleteFinance()

export const getAllFinances = new GetAllFinances()

export const getFinanceById = new GetFinanceById()

export const updateFinance = new UpdateFinance()