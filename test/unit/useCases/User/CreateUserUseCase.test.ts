import { createUser } from "../../../../src/adapters/ormAdapter/protocols/userProtocols"
import { IUser, User } from "../../../../src/entities/User"
import { CreateUserUseCase } from "../../../../src/usecases/user/CreateUserUseCase"


describe ("Deve criar um novo usário", ()=>{
    
    it('deve retornar o id do usuario criado', async () => {

        const createUserUseCase = new CreateUserUseCase(createUser)

        const userToBeCreated: IUser = {
            username: 'cleiton4',
            password: 'cleiton123',
                email: 'cleiton1@gmail.com',
                telephone: '5548978453627'
        }

        const user = await createUserUseCase.execute(userToBeCreated)

        expect(user.props).toHaveProperty('id')

    })
})