import { GetAllStock } from "../prismaAdapter/stock/GetAllStock";
import { GetStockByBookTitle } from "../prismaAdapter/stock/GetStockByBookTitle";
import { GetStockByQuantity } from "../prismaAdapter/stock/GetStockByQuantity";
import { UpdateStock } from "../prismaAdapter/stock/UpdateStock";

export const getAllStock = new GetAllStock()

export const getStockByBookTitle = new GetStockByBookTitle()

export const getStockByQuantity = new GetStockByQuantity()

export const updateStock = new UpdateStock()