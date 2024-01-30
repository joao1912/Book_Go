import { IDeleteAllFinances } from "../../repositories/finance/IDeleteAllFinances";
import { prisma } from "../db";


export class DeleteAllFinances implements IDeleteAllFinances {
    
    async execute(): Promise<void> {
       
        try {

            await prisma.finance.deleteMany()

        } catch (error) {

            throw new Error('internal server error: ' + error)
            
        }

    }
    
}