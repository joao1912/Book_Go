import { prisma } from "../db";
import { IGetUser } from "../../repositories/user/IGetUser";
import { User } from "../../../../entities/User";

export class GetUser implements IGetUser {

  async execute(input: string) {

    try {
      const user = await prisma.user.findUnique({
        where: {   
             email: input  
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

      let message = "Invalid input "
      return message

    } catch (error) {
      throw new Error('Internal server error: ' + error)
    }


  }

}