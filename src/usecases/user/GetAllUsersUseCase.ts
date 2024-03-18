import { IGetAllUsers } from "../../adapters/ormAdapter/repositories/user/IGetAllUsers"

export class GetAllUsersUseCase {

    protected userService: IGetAllUsers
    constructor(ormAdapter: IGetAllUsers) {
        this.userService = ormAdapter
    }

    async execute() {

        return await this.userService.execute()

    }

}

