import { prisma } from "../db.js";
import { IUser, User } from "../../../../entities/User.js";
import { IUpdateUser } from "../../repositories/user/IUpdateUser.js";
import handlePrismaError from "../util/handlePrismaError.js";

export class UpdateUser implements IUpdateUser {

  async execute({ props }: User): Promise<User | void> {

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

      return handlePrismaError('UserError', error)

    }

  }
}