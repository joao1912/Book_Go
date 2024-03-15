import { prisma } from "../db";
import { IGetUser } from "../../repositories/user/IGetUser";
import { User } from "../../../../entities/User";
import handlePrismaError from "../util/handlePrismaError";

export class GetUser implements IGetUser {

  async execute(input: string): Promise<User | void> {

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: input
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

      return handlePrismaError('UserError', error)
        
    }
  }
}