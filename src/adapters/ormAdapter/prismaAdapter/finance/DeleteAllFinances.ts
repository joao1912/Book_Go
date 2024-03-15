import { IDeleteAllFinances } from "../../repositories/finance/IDeleteAllFinances.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";


export class DeleteAllFinances implements IDeleteAllFinances {
    
    async execute(): Promise<void> {
       
        try {

            await prisma.finance.deleteMany()

        } catch (error) {

            return handlePrismaError("FinanceError", error)
            
        }

    }
    
}