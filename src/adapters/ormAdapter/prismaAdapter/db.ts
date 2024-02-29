import { PrismaClient } from "@prisma/client"
import { Prisma } from "@prisma/client"
export const prisma = new PrismaClient()
export const PrismaErrorClient = Prisma.PrismaClientKnownRequestError
export const PrismaErrorServer = Prisma.PrismaClientValidationError || Prisma.PrismaClientInitializationError
export interface BookUpdateInput extends Prisma.BookUpdateInput {}