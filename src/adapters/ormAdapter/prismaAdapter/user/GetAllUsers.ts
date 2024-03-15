import { User } from "../../../../entities/User.js";
import { IGetAllUsers } from "../../repositories/user/IGetAllUsers.js";
import { prisma } from "../db.js";
import handlePrismaError from "../util/handlePrismaError.js";


export class GetAllUsers implements IGetAllUsers {

  async execute(): Promise<User[] | void> {

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

      return handlePrismaError("UserError", error)

    }
  }

}