import { prisma } from "../db.js";
import { IDeleteAllUsers } from "../../repositories/user/IDeleteAllUsers.js";

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
            throw new Error('Internal server error: ' + error)
        }

    }
}