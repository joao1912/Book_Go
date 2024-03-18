import { IUpdateUser } from "../../adapters/ormAdapter/repositories/user/IUpdateUser"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"
import { IUser, User, userSchema } from "../../entities/User"

export class UpdateUserUseCase {

    protected userService: IUpdateUser
    constructor(ormAdapter: IUpdateUser) {
        this.userService = ormAdapter
    }

    async execute(userData: IUser) {
        try {

            const validatedData = validatorAdapter.validateSchema<IUser, typeof userSchema['_output']>(userData, userSchema)

            const userInstance = new User(validatedData)

            return await this.userService.execute(userInstance)
        } catch (error) {
            throw new Error("Internal server error: " + error)
        }
      

    }

}