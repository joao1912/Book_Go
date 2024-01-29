import { ICreateUser } from "../../adapters/ormAdapter/repositories/user/ICreateUser"
import { User } from "../../entities/User"

export class CreateUserUseCase {

    protected userService: ICreateUser
    constructor(ormAdapter: ICreateUser) {
        this.userService = ormAdapter
    }

    async execute(userData: User) {

        return await this.userService.execute(userData)

    }

}