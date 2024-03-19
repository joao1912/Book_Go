import { IGetAllUsers } from "../../adapters/ormAdapter/repositories/user/IGetAllUsers"
import { IGetUser } from "../../adapters/ormAdapter/repositories/user/IGetUser"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"

// a classe vai receber como argumento(ormAdapter) o metodo do prisma que vai relizar a operação

export class GetUserUseCase {

    protected userService: IGetUser
    constructor(ormAdapter: IGetUser) {
        this.userService = ormAdapter
    }

    async execute(input: string | undefined) {
        //revisar
        if (!input) ServerResponse.badRequest('UserError', 'O valor passado deve ser válido')

        return await this.userService.execute(input)

    }

}

