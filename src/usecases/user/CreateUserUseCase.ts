import { ICreateUser } from "../../adapters/ormAdapter/repositories/user/ICreateUser"
import { IUser } from "../../entities/User"

export class CreateUserUseCase {

    protected userService: ICreateUser
    constructor(ormAdapter: ICreateUser) {
        this.userService = ormAdapter
    }

    async execute(userData: Omit<IUser, 'id'>) {

        return await this.userService.execute(userData)

    }

}