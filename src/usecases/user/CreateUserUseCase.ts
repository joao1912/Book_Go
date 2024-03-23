import { encryptorAdapter } from "../../adapters/encryptorAdapter/protocol"
import { ICreateUser } from "../../adapters/ormAdapter/repositories/user/ICreateUser"
import { validatorAdapter } from "../../adapters/validatorAdapter/protocol"
import { SchemaKey } from "../../adapters/validatorAdapter/repository/IValidatorAdapterRepository"
import { IUser, User } from "../../entities/User"


export class CreateUserUseCase {

    protected createUserService: ICreateUser

    constructor(ormAdapter: ICreateUser) {

        this.createUserService = ormAdapter

    }

    async execute(userData: IUser) {

        const data = validatorAdapter.validateSchema<IUser>(userData, SchemaKey.user)
        
        const passwordHash = encryptorAdapter.hash(data.password)
        
        data.password = passwordHash

        const userInstance = new User(data)
        const user = await this.createUserService.execute(userInstance)

        return user

    }

}
