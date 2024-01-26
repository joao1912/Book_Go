import { prisma } from "../../../../../prisma/db";
import { IUser } from "../../../../entities/User";
import { ICreateUser } from "../../repositories/user/ICreateUser";

 export class CreateUser implements ICreateUser {
  

  
    async execute({username, email, telephone, password}: Omit<IUser, "id">): Promise <IUser> {


        const user = await prisma.user.create({
            data: {
                username: username,
                password: password,
                email: email,
                telephone: telephone 
                   
               
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

    }
 }