import { IUpdateUser } from "../../adapters/ormAdapter/repositories/user/IUpdateUser"
import { IUser, User } from "../../entities/User"

export class UpdateUserUseCase {

    protected userService: IUpdateUser
    constructor(ormAdapter: IUpdateUser) {
        this.userService = ormAdapter
    }

    async execute(userData: IUser) {
        try {
            const userInstance = new User(userData)

            return await this.userService.execute(userInstance)
        } catch (error) {
            throw new Error("Internal server error: " + error)
        }
      

    }

}