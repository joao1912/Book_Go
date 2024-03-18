import { IDeleteUser } from "../../adapters/ormAdapter/repositories/user/IDeleteUser";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";
import ServerResponse from "../../interface/controllers/utils/ServerResponse";


export class DeleteUserUseCase {

    protected userService: IDeleteUser

    constructor(ormAdapter: IDeleteUser) {
        this.userService = ormAdapter
    }

    async execute(id: string | undefined) {

        const validatedId = validatorAdapter.validateId(id) 

        return await this.userService.execute(validatedId)

    }

}