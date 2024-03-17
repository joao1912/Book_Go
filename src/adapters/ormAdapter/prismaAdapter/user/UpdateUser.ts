import { prisma } from "../db";
import { IUser, User } from "../../../../entities/User";
import { IUpdateUser } from "../../repositories/user/IUpdateUser";
import handlePrismaError from "../util/handlePrismaError";

export class UpdateUser implements IUpdateUser {

  async execute({ props }: User): Promise<User> {

    const { id, username, password, email, telephone } = props
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

      return new User({
        id: user.id,
        email: user.email,
        password: user.password,
        telephone: user.telephone,
        username: user.username
      })

    } catch (error) {

      handlePrismaError('UserError', error)

    }

  }
}