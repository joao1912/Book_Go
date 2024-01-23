import { prisma } from "../../../../../prisma/db";
import { IUser } from "../../../../entities/User";
import { IUpdateUser } from "../../repositories/user/IUpdateUser";

 export class CreateUser implements IUpdateUser{
  
    async execute(user) {


        const users = await prisma.user.update({
            where: {
                id: user.id
            },
            
            data: {
                username: user.username || undefined,
                password: user.password || undefined,
                contact: {
                    email: user.contact.email || undefined,
                    telephone: user.contact.telephone || undefined
                  }
              },
                
        })
        return users

    }
 }