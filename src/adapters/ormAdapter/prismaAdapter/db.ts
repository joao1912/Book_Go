import { PrismaClient } from "@prisma/client"
import { Prisma } from "@prisma/client"
export const prisma = new PrismaClient()
export const PrismaErrorClient = Prisma.PrismaClientValidationError
export const PrismaErrorServer =  Prisma.PrismaClientInitializationError
export interface BookUpdateInput extends Prisma.BookUpdateInput {}