import { IUpdateUser } from "../../adapters/ormAdapter/repositories/user/IUpdateUser"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"
import { SchemaKey } from "../../adapters/validatorAdapter/repository/IValidatorAdapterRepository"
import { IUser, User, userSchema } from "../../entities/User"

export class UpdateUserUseCase {

    protected userService: IUpdateUser
    constructor(ormAdapter: IUpdateUser) {
        this.userService = ormAdapter
    }

    async execute(userData: IUser) {

        const validatedData = validatorAdapter.validateSchema<IUser>(userData, SchemaKey.user)

        const userInstance = new User(validatedData)

        return await this.userService.execute(userInstance)

    }

}