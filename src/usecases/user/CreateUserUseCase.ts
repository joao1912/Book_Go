import { ICreateUser } from "../../adapters/ormAdapter/repositories/user/ICreateUser"
import { IUser, User } from "../../entities/User"


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