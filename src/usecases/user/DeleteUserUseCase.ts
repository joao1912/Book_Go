import { IDeleteUser } from "../../adapters/ormAdapter/repositories/user/IDeleteUser";
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol";


export class DeleteUserUseCase {

    protected deleteUserService: IDeleteUser

    constructor(ormAdapter: IDeleteUser) {
        this.deleteUserService = ormAdapter
    }

    async execute(id: string | undefined) {

        const validatedId = validatorAdapter.validateId(id) 

        return await this.deleteUserService.execute(validatedId)

    }

}