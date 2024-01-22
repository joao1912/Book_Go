import { IGetAll } from "../repositories/user/IGetAll";
import { prisma } from "../../../../prisma/db";


export class GetAll implements IGetAll {
    
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