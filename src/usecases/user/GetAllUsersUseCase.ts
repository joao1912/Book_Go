import { IGetAllUsers } from "../../adapters/ormAdapter/repositories/user/IGetAllUsers"
import { User } from "../../entities/User"


export class GetAllUsersUseCase {

    protected getAllUsersService: IGetAllUsers

    constructor(ormAdapter: IGetAllUsers) {

        this.getAllUsersService = ormAdapter

    }

    async execute(): Promise<User[]> {

        return await this.getAllUsersService.execute()

    }

}

