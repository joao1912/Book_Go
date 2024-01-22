import { IGetAll } from "../../adapters/ormAdapter/repositories/user/IGetAll"

// a classe vai receber como argumento(ormAdapter) o metodo do prisma que vai relizar a operação

export class GetAllUsers {

    protected userService: IGetAll

    constructor(ormAdapter: IGetAll) {
        this.userService = ormAdapter
    }

    async execute() {

        return await this.userService.execute()

    }

}