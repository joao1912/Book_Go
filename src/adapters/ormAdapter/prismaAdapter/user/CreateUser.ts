import { prisma } from "../db";
import { IUser, User } from "../../../../entities/User";
import { ICreateUser } from "../../repositories/user/ICreateUser";
import handlePrismaError from "../util/handlePrismaError";

export class CreateUser implements ICreateUser {

  //@ts-ignore
  async execute({ props }: Omit<User, "id">): Promise<User> {

    const { username, email, telephone, password } = props

    try {

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
          telephone: true,

        }
      })

      return new User({
        id: user.id,
        email: user.email,
        telephone: user.telephone,
        password: user.password,
        username: user.username,
        favoritesBooks: []
      })

    } catch (error: any) {

      handlePrismaError("UserError", error)

    }
  }
}