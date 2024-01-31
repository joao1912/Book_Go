import { CreateFinance } from "../prismaAdapter/finance/CreateFinance";
import { DeleteAllFinances } from "../prismaAdapter/finance/DeleteAllFinances";
import { DeleteFinance } from "../prismaAdapter/finance/DeleteFinance";
import { GetAllFinances } from "../prismaAdapter/finance/GetAllFinances";
import { GetFinanceById } from "../prismaAdapter/finance/GetFinanceById";
import { UpdateFinance } from "../prismaAdapter/finance/UpdateFinance";


export const createFinance = new CreateFinance()

export const deleteAllFinances = new DeleteAllFinances()

export const deleteFinance = new DeleteFinance()

export const getAllFinances = new GetAllFinances()

export const getFinanceById = new GetFinanceById()

export const updateFinance = new UpdateFinance()