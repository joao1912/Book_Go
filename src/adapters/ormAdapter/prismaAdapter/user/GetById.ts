import { prisma } from "../db";
import { IGetById } from "../../repositories/user/IGetById";
import { User } from "../../../../entities/User";

export class GetById implements IGetById {

  async execute(id: string) {

    try {
      const user = await prisma.user.findFirstOrThrow({
        where: { id: id },
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
        username: user.username,
        password: user.password,
        email: user.email,
        telephone: user.telephone,
      })

    } catch (error) {
      throw new Error('Internal server error: ' + error)
    }


  }

}