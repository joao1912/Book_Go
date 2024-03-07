import { PrismaClient } from "@prisma/client"
import { Prisma } from "@prisma/client"
export const prisma = new PrismaClient()

export interface BookUpdateInput extends Prisma.BookUpdateInput {}
// const whereEmailIsUnique = Prisma.validator<Prisma.UserWhereUniqueInput>()({ email: 'rich@boop.com',})

