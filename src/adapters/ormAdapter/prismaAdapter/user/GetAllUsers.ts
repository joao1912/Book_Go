import { User } from "../../../../entities/User";
import { IGetAllUsers } from "../../repositories/user/IGetAllUsers";
import { prisma } from "../db";
import handlePrismaError from "../util/handlePrismaError";


export class GetAllUsers implements IGetAllUsers {

  async execute(): Promise<User[]> {

    try {

      const user = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          password: true,
          email: true,
          telephone: true
        }
      })

      let users = [];
      for (let data of user) {

        users.push(new User({
          id: data.id,
          username: data.username,
          password: data.password,
          email: data.email,
          telephone: data.telephone,

        }));


      }

      return users;
    } catch (error) {

      handlePrismaError("UserError", error)
      throw error

    }
  }

}