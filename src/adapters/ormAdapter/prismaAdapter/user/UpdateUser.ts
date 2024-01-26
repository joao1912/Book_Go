import { prisma } from "../../../../../prisma/db";
import { IUser } from "../../../../entities/User";
import { IUpdateUser } from "../../repositories/user/IUpdateUser";

 export class UpdateUser implements IUpdateUser{
  
    async execute({id,username, password, email, telephone}: Partial<IUser>): Promise<Partial<IUser>> {
        try {
          const user = await prisma.user.update({
            where: {
                id: id
            },
            
            data: {
                username: username || undefined,
                password: password || undefined,
                        email: email || undefined,
                        telephone: telephone || undefined
                      },
              select: {
                id: true,
                username: true,
                password: true,          
                email: true,
                telephone: true
                  }
   
              
                
        })
        
       
        
        
        return user
        } catch (error) {
          throw new Error("Something happened: " + error)
        }
       
        // return users

    }
 }