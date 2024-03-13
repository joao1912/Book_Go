import { prisma } from "../db.js";
import { IUser, User } from "../../../../entities/User.js";
import { ICreateUser } from "../../repositories/user/ICreateUser.js";

export class CreateUser implements ICreateUser {


  async execute({ props }: Omit<User, "id">): Promise<User> {

    const { username, email, telephone, password } = props

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

  }
}