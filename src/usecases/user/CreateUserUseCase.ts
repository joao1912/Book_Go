import { ICreateUser } from "../../adapters/ormAdapter/repositories/user/ICreateUser"
import { IUser, User } from "../../entities/User"

export class CreateUserUseCase {

    protected userService: ICreateUser
    constructor(ormAdapter: ICreateUser) {
        this.userService = ormAdapter
    }

    async execute(userData: Omit<IUser, 'id'>) {

        const user = await this.userService.execute(userData)

        const userInstance = new User()

    }

}