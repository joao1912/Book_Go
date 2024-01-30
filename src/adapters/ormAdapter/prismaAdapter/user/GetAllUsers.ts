import { IGetAllUsers } from "../../repositories/user/IGetAllUsers";
import { prisma } from "../db";


export class GetAllUsers implements IGetAllUsers {
    
    async execute() {

        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                password: true,
                email: true,
                telephone: true
                  
            }
        })

        return users

    }

}