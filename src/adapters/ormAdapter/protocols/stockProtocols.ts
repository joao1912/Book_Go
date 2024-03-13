import { GetAllStock } from "../prismaAdapter/stock/GetAllStock.js";
import { GetStockByBookTitle } from "../prismaAdapter/stock/GetStockByBookTitle.js";
import { GetStockByQuantity } from "../prismaAdapter/stock/GetStockByQuantity.js";
import { UpdateStock } from "../prismaAdapter/stock/UpdateStock.js";

export const getAllStock = new GetAllStock()

export const getStockByBookTitle = new GetStockByBookTitle()

export const getStockByQuantity = new GetStockByQuantity()

export const updateStock = new UpdateStock()