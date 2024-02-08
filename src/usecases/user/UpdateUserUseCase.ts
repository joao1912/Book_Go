import { IUpdateUser } from "../../adapters/ormAdapter/repositories/user/IUpdateUser"
import { User } from "../../entities/User"

export class UpdateUserUseCase {

    protected userService: IUpdateUser
    constructor(ormAdapter: IUpdateUser) {
        this.userService = ormAdapter
    }

    async execute(userData: Partial<User>) {
        try {
            return await this.userService.execute(userData)
        } catch (error) {
            throw new Error("Internal server error: " + error)
        }
      

    }

}