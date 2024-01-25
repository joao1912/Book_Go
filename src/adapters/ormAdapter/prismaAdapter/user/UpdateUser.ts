import { prisma } from "../../../../../prisma/db";
import { IUser } from "../../../../entities/User";
import { IUpdateUser } from "../../repositories/user/IUpdateUser";

 export class UpdateUser implements IUpdateUser{
  
    async execute({id,username, password, contact}: Partial<IUser>): Promise<Partial<IUser>> {


        const users = await prisma.user.update({
            where: {
                id: id
            },
            
            data: {
                username: username || undefined,
                password: password || undefined,

                contact: {
                    update: {
                    data: {   
                        email: contact?.email || undefined,
                        telephone: contact?.telephone || undefined}
                 
                  }
                }
              },
              // select: {
              //   id: true,
              //   username: true,
              //   password: true,
              //   contact: {
              //     select: {
              //       email: true,
              //       telephone: true
              //     }
              //   }
              // }
              select: undefined
                
        })

        
        
        return users

    }
 }