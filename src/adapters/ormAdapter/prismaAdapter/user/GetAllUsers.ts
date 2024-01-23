import { IGetAll } from "../../repositories/user/IGetAllUsers";
import { prisma } from "../../../../../prisma/db";


export class GetAllUsers implements IGetAll {
    
    async execute() {

        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                password: true,
                contact: {
                  select: {
                    email: true,
                    telephone: true
                  }
                }
            }
        })

        return users

    }

}