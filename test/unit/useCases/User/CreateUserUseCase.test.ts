import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols"
import { IUser } from "../../../../src/entities/User"
import { CreateUserUseCase } from "../../../../src/usecases/user/CreateUserUseCase"


describe ("Deve criar um novo usário", () => {
    
    it('deve retornar o id do usuario criado', async () => {

        const createUserUseCase = new CreateUserUseCase(createUser)

        const userToBeCreated: IUser = {
            username: 'cleiton4123',
            password: 'cleiton123',
            email: 'cleiton335@gmail.com',
            telephone: '5548932453627'
        }

        const user = await createUserUseCase.execute(userToBeCreated)

        expect(user.props).toHaveProperty('id')

    })
})