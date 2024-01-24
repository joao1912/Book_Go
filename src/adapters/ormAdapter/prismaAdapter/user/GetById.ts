import { prisma } from "../../../../../prisma/db";
import { IGetById } from "../../repositories/user/IGetById";

export class GetById implements IGetById {
    
    async execute(id:string) {

        try {
          const users = await prisma.user.findUnique({
            where: {id: id},
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

        } catch (error) {
          throw new Error('Internal server error: ' + error)
        }
     

    }

}