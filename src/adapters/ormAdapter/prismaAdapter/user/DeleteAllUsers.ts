import { prisma } from "../db";
import { IDeleteAllUsers } from "../../repositories/user/IDeleteAllUsers";
import handlePrismaError from "../util/handlePrismaError";

export class DeleteAllUsers implements IDeleteAllUsers {

    async execute(): Promise<void> {
       
        try {
            await prisma.user.deleteMany({
                 where: {
                email: {
                  not: "admin_teste@gmail.com",
                },
              }
            })

        } catch (error) {
          handlePrismaError("UserError", error)
          throw error
        }

    }
}