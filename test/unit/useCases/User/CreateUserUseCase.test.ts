import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols"
import { IUser } from "../../../../src/entities/User"
import { CreateUserUseCase } from "../../../../src/usecases/user/CreateUserUseCase"


describe ("Deve criar um novo usário", () => {
    
    it('deve retornar o id do usuario criado', async () => {

        const createUserUseCase = new CreateUserUseCase(createUser)

        const userToBeCreated: IUser = {
            username: 'Cleitin',
            password: '123.aB',
            email: 'admin_teste@gmail.com',
            telephone: '5548998332618'
        }

        const user = await createUserUseCase.execute(userToBeCreated)

        expect(user.props).toHaveProperty('id')

    })
})