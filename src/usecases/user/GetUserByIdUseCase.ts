import { IGetUser } from "../../adapters/ormAdapter/repositories/user/IGetUser"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"
import ServerResponse from "../../interface/controllers/utils/ServerResponse"

export class GetUserByIdUseCase {

    protected userService: IGetUser
    constructor(ormAdapter: IGetUser) {
        this.userService = ormAdapter
    }

    async execute(id: string | undefined) {

        const validateId = validatorAdapter.validateId(id)

        return await this.userService.execute(validateId)

    }

}

