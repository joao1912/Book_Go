import { prisma } from "../../../../../prisma/db";
import { IUser } from "../../../../entities/User";
import { ICreateUser } from "../../repositories/user/ICreateUser";

 export class CreateUser implements ICreateUser {
  
    async execute({username, contact, password}: Omit<IUser, "id">) {


        const user = await prisma.user.create({
            data: {
                username: username,
                password: password,
                contact: {
                    create: {
                        email: contact.email,
                        telephone: contact.telephone
                      }
                }
               
              },
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
        return user

    }
 }