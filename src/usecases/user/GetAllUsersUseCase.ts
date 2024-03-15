import { IGetAllUsers } from "../../adapters/ormAdapter/repositories/user/IGetAllUsers"

// a classe vai receber como argumento(ormAdapter) o metodo do prisma que vai relizar a operação

export class GetAllUsersUseCase {

    protected userService: IGetAllUsers
    constructor(ormAdapter: IGetAllUsers) {
        this.userService = ormAdapter
    }

    async execute() {

        return await this.userService.execute()

    }

}

