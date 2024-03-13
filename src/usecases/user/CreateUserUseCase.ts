import { ICreateUser } from "../../adapters/ormAdapter/repositories/user/ICreateUser.js"
import { IUser, User } from "../../entities/User.js"


export class CreateUserUseCase {

    protected userService: ICreateUser
    constructor(ormAdapter: ICreateUser) {
        this.userService = ormAdapter
    }

    async execute(userData: IUser) {

        const userInstance = new User(userData)
        const user = await this.userService.execute(userInstance)

        return user

    }

}