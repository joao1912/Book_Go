import { IDeleteUser } from "../../adapters/ormAdapter/repositories/user/IDeleteUser.js";


export class DeleteUserUseCase {

    protected userService: IDeleteUser

    constructor(ormAdapter: IDeleteUser) {
        this.userService = ormAdapter
    }

    async execute(id: string) {

        try {
            
            return await this.userService.execute(id)

        } catch (error) {

            throw new Error('Internal server error: ' + error)
            
        }

    }

}