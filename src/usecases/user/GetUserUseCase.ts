import { IGetUser } from "../../adapters/ormAdapter/repositories/user/IGetUser"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"

// a classe vai receber como argumento(ormAdapter) o metodo do prisma que vai relizar a operação

export class GetUserUseCase {

    protected userService: IGetUser
    constructor(ormAdapter: IGetUser) {
        this.userService = ormAdapter
    }

    async execute(email: string | undefined) {
        
        if (!email) ServerResponse.badRequest('UserError', 'Email must be valid.')

        return await this.userService.execute(email)

    }

}

