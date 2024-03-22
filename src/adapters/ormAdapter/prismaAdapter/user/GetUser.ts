import { prisma } from "../db";
import { IGetUser } from "../../repositories/user/IGetUser";
import { User } from "../../../../entities/User";
import handlePrismaError from "../util/handlePrismaError";
import ServerResponse from "../../../../interface/controllers/utils/ServerResponse";

export class GetUser implements IGetUser {
  //@ts-ignore
  async execute(email: string): Promise<User> {

    try {

      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      })

      if (!user) {

        ServerResponse.notAuthorized('UserError', 'Email or password is incorrect.')

      }

      return new User({
        id: user!.id,
        username: user!.username,
        password: user!.password,
        email: user!.email,
        telephone: user!.telephone,
      })


    } catch (error) {

      handlePrismaError('UserError', error)

    }
  }
}