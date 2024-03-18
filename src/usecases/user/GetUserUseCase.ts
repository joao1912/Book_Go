import { IGetAllUsers } from "../../adapters/ormAdapter/repositories/user/IGetAllUsers"
import { IGetUser } from "../../adapters/ormAdapter/repositories/user/IGetUser"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"

// a classe vai receber como argumento(ormAdapter) o metodo do prisma que vai relizar a operação

export class GetUserUseCase {

    protected userService: IGetUser
    constructor(ormAdapter: IGetUser) {
        this.userService = ormAdapter
    }

    async execute(userId: string) {

        const validatedId = validatorAdapter.validateId(userId) 

        return await this.userService.execute(validatedId)

    }

}

