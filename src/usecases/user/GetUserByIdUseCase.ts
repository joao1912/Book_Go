import { IGetUser } from "../../adapters/ormAdapter/repositories/user/IGetUser"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"


export class GetUserByIdUseCase {

    protected getUserByIdService: IGetUser

    constructor(ormAdapter: IGetUser) {

        this.getUserByIdService = ormAdapter
        
    }

    async execute(id: string | undefined) {

        const validateId = validatorAdapter.validateId(id)

        return await this.getUserByIdService.execute(validateId)

    }

}
