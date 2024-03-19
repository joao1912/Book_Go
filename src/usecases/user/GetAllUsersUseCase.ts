import { IGetAllUsers } from "../../adapters/ormAdapter/repositories/user/IGetAllUsers"
import { User } from "../../entities/User"

export class GetAllUsersUseCase {

    protected userService: IGetAllUsers
    constructor(ormAdapter: IGetAllUsers) {
        this.userService = ormAdapter
    }

    async execute(): Promise<User[]> {

        return await this.userService.execute()

    }

}

