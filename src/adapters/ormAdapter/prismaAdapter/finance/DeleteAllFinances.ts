import { IDeleteAllFinances } from "../../repositories/finance/IDeleteAllFinances";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";


export class DeleteAllFinances implements IDeleteAllFinances {
    
    async execute(): Promise<void> {
       
        try {

            await prisma.finance.deleteMany()

        } catch (error) {

            return handlePrismaError("FinanceError", error)
            
        }

    }
    
}