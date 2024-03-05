import { prisma } from "../db";
import { IGetUser } from "../../repositories/user/IGetUser";
import { User } from "../../../../entities/User";
import handlePrismaError from "../util/handlePrismaError";

export class GetUser implements IGetUser {

  async execute(input: string) {

    try {
      const user = await prisma.user.findUnique({
        where: {
          // id: input, 
          // OR: [
             email: input 
          //   { id: input }
          // ]
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

      let message = `Email not registered`
      return message

    } catch (error) {
      return handlePrismaError(error)
        
    }


  }

}