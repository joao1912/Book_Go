import { ICreateUser } from "../../adapters/ormAdapter/repositories/user/ICreateUser"
import { User } from "../../entities/User"


export class CreateUserUseCase {

    protected userService: ICreateUser
    constructor(ormAdapter: ICreateUser) {
        this.userService = ormAdapter
    }

    async execute(userData: Omit<User, "id">) {

        const user = await this.userService.execute(userData)

    

    }

}