import { PrismaClient } from "@prisma/client"
import { Prisma } from "@prisma/client"
export const prisma = new PrismaClient()

export interface BookUpdateInput extends Prisma.BookUpdateInput {}