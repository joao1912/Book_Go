import { ICreateUser } from "../../adapters/ormAdapter/repositories/user/ICreateUser"
<<<<<<< HEAD
import { User } from "../../entities/User"
=======
import { IUser, User } from "../../entities/User"
>>>>>>> fc4540da9b8d89003ac8a508e6e13e9a8d628c2e

export class CreateUserUseCase {

    protected userService: ICreateUser
    constructor(ormAdapter: ICreateUser) {
        this.userService = ormAdapter
    }

    async execute(userData: User) {

        const user = await this.userService.execute(userData)

        const userInstance = new User()

    }

}