import { prisma } from "../db";
import { IGetUser } from "../../repositories/user/IGetUser";
import { User } from "../../../../entities/User";
import handlePrismaError from "../util/handlePrismaError";

export class GetById implements IGetUser {
  //@ts-ignore
  async execute(input: string): Promise<User> {

    try {
      const user = await prisma.user.findUnique({
        where: {   
             id: input  
        },
        select: {
          id: true,
          username: true,
          password: true,
          email: true,
          telephone: true
        }
      })

      if(user != null){ 
      return new User({
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email,
        telephone: user.telephone,
      })
    }

    } catch (error) {
      handlePrismaError("UserError", error)
      
    }


  }

}