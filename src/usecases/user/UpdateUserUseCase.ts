import { getUserById } from "../../adapters/ormAdapter/protocols/userProtocols"
import { IUpdateUser } from "../../adapters/ormAdapter/repositories/user/IUpdateUser"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"
import { SchemaKey } from "../../adapters/validatorAdapter/repository/IValidatorAdapterRepository"
import { IUser, User } from "../../entities/User"
import { GetUserByIdUseCase } from "./GetUserByIdUseCase"

export class UpdateUserUseCase {

    protected userService: IUpdateUser
    constructor(ormAdapter: IUpdateUser) {
        this.userService = ormAdapter
    }

    async execute(userData: Partial<IUser>) {

        const getUserUseCase = new GetUserByIdUseCase(getUserById)
        const validateId = validatorAdapter.validateId(userData.id)
        const validateData = validatorAdapter.validatePartial<Partial<IUser>>(userData, SchemaKey.user)
        const schemaData = await getUserUseCase.execute(validateId)

        const userDataToUpdate = {...schemaData.props, ...validateData}

        const userInstance = new User(userDataToUpdate)

        return await this.userService.execute(userInstance)

    }

}