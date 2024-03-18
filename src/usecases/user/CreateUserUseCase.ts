import { ICreateUser } from "../../adapters/ormAdapter/repositories/user/ICreateUser"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"
import { IUser, User, userSchema } from "../../entities/User"


export class CreateUserUseCase {

    protected userService: ICreateUser
    constructor(ormAdapter: ICreateUser) {
        this.userService = ormAdapter
    }

    async execute(userData: IUser) {

        const data = validatorAdapter.validate<IUser, typeof userSchema['_output']>(userData, userSchema)

        const userInstance = new User(data)
        const user = await this.userService.execute(userInstance)

        return user

    }

}