import { prisma } from "../../../../../prisma/db";
import { IUser } from "../../../../entities/User";
import { ICreateUser } from "../../repositories/user/ICreateUser";

 export class CreateUser implements ICreateUser {
  
    async execute(user: Omit<IUser, "id">) {


        const users = await prisma.user.create({
            data: {
                username: user.username,
                password: user.password,
                contact: {
                    email: user.contact.email,
                    telephone: user.contact.telephone
                  }
              },
                
        })
        return users

    }
 }