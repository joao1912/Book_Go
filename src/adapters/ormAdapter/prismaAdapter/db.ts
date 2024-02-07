import { PrismaClient } from "@prisma/client"
import { Prisma } from "@prisma/client"
export const prisma = new PrismaClient()
export const PrismaError = Prisma.PrismaClientKnownRequestError