import { IGetAllUsers } from "../../adapters/ormAdapter/repositories/user/IGetAllUsers"
import { IGetUser } from "../../adapters/ormAdapter/repositories/user/IGetUser"

// a classe vai receber como argumento(ormAdapter) o metodo do prisma que vai relizar a operação

export class GetUserUseCase {

    protected userService: IGetUser
    constructor(ormAdapter: IGetUser) {
        this.userService = ormAdapter
    }

    async execute(input: string) {

        return await this.userService.execute(input)

    }

}

